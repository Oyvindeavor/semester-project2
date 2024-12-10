'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import { deleteListingById } from '@/utils/api/deleteListingById';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AuctionTabs from '@/components/profile/TabPanelProfile';
import type { Listing } from '@/types/api/listing';
import { useRouter } from 'next/navigation';

interface Media {
  url: string;
  alt?: string;
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
  credits: number;
  wins: Listing[];
}

interface Profile {
  data: ProfileData;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

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

        setProfile(data.profile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error loading profile');
      }
    };

    if (status === 'authenticated') {
      fetchProfile();
      router.push('/profile');
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
      <ProfileHeader
        username={profile.data.name}
        avatarUrl={profile.data.avatar.url}
        bannerUrl={profile.data.banner.url}
        bio={profile.data.bio}
        totalAuctions={profile.data.listings.length}
        credits={profile.data.credits}
      />
      <AuctionTabs
        activeListings={profile.data.listings}
        wonListings={profile.data.wins}
        onDelete={handleDelete}
        deleting={deleting}
      />
    </div>
  );
}
