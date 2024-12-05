'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import EditProfileModal from '@/components/forms/EditProfileForm';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import { deleteListingById } from '@/utils/api/deleteListingById';
import UpdateListingForm from '@/components/forms/updateListingForm';
import ProfileHeader from '@/components/profile/ProfileHeader';

// Define interfaces for type safety
interface Media {
  url: string;
  alt?: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  media: Media[];
}

interface ProfileData {
  name: string;
  avatar: {
    url: string;
  };
  banner: {
    url: string;
  };
  bio: string;
  listings: Listing[];
}

interface Profile {
  data: ProfileData;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        console.log('Fetched profile data:', data.profile);
        setProfile(data.profile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error loading profile');
      }
    };

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  if (status === 'loading') return <div>Loading session...</div>;
  if (!session) return <div>You must be logged in to view this page.</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  const handleDelete = async (id: string) => {
    try {
      const confirmation = confirm(
        'Are you sure you want to delete this listing?'
      );
      if (!confirmation) return;

      setDeleting(id);
      await deleteListingById(id);
      alert('Listing deleted successfully!');
      setProfile((prevProfile) => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          data: {
            ...prevProfile.data,
            listings: prevProfile.data.listings.filter(
              (listing) => listing.id !== id
            ),
          },
        };
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <EditProfileModal />
      <ProfileHeader
        username={profile.data.name}
        avatarUrl={profile.data.avatar.url}
        bannerUrl={profile.data.banner.url}
        bio={profile.data.bio}
        totalAuctions={profile.data.listings.length}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {profile.data.listings.map((listing) => (
          <Card
            key={listing.id}
            sx={{
              width: 300,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <img
                src={
                  listing.media.length > 0
                    ? listing.media[0].url
                    : '/default-listing.jpg'
                }
                alt={
                  listing.media.length > 0 && listing.media[0].alt
                    ? listing.media[0].alt
                    : listing.title
                }
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
              />
              <Typography variant="h6" component="div" gutterBottom>
                {listing.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {listing.description}
              </Typography>
            </CardContent>
            <CardActions>
              <UpdateListingForm id={listing.id} />
              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => handleDelete(listing.id)}
                disabled={deleting === listing.id}
              >
                {deleting === listing.id ? 'Deleting...' : 'Delete'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
}
