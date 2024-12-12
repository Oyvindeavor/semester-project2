'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { deleteListingById } from '@/utils/api/deleteListingById';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AuctionTabs from '@/components/profile/TabPanelProfile';
import type { Listing } from '@/types/api/listing';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Unable to load profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const handleDelete = async (id: string) => {
    try {
      // Use a more accessible confirmation dialog
      if (
        !window.confirm(
          'Are you sure you want to delete this listing? This action cannot be undone.'
        )
      ) {
        return;
      }

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

      // Announce successful deletion to screen readers
      const announcer = document.getElementById('status-announcer');
      if (announcer) {
        announcer.textContent = 'Listing successfully deleted';
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError('Failed to delete listing. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        role="status"
        aria-label="Loading profile"
      >
        <CircularProgress aria-label="Loading" />
      </Box>
    );
  }

  // Authentication check
  if (!session) {
    return (
      <Box p={4}>
        <Alert severity="warning" role="alert">
          You must be logged in to view this page.
        </Alert>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      </Box>
    );
  }

  // No profile data
  if (!profile) {
    return (
      <Box p={4}>
        <Alert severity="info" role="alert">
          No profile data available.
        </Alert>
      </Box>
    );
  }

  return (
    <Box aria-label="User Profile">
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

      {/* Status announcer for screen readers */}
      <div
        id="status-announcer"
        role="status"
        aria-live="polite"
        className="sr-only"
      />
    </Box>
  );
}
