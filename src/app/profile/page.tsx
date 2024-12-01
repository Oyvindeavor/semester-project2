'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Card,
  Avatar,
} from '@mui/material';
import fetchProfileById from '@/utils/api/fetchProfile';
import { useAuth } from '@/context/useAuth';
import { User } from '@/context/useAuth';

export default function Profile() {
  const { accessToken, user, loading, setAuthData } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!accessToken || !user?.name) {
      router.push('/login');
    }
  }, [accessToken, user?.name, router]);

  // Fetch the profile only when required
  useEffect(() => {
    if (accessToken && user?.name && !profile) {
      const fetchProfile = async () => {
        try {
          const profileData = await fetchProfileById(user.name, accessToken);
          setProfile(profileData);
          setAuthData(accessToken, profileData);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchProfile();
    }
  }, [accessToken, user?.name, profile, setAuthData]);

  // Handle loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading authentication...
        </Typography>
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Error: {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.refresh()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Handle when profile is not yet loaded
  if (!profile) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Avatar
        src={profile.avatar.url}
        alt={profile.avatar.alt || 'User Avatar'}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        {profile.name}s Profile
      </Typography>
      <Card
        sx={{
          padding: 3,
          width: '100%',
          boxShadow: 3,
        }}
      >
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Bio:</strong> {profile.bio || 'No bio available'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Credits:</strong> {profile.credits}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Listings:</strong> {profile.listings.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Wins:</strong> {profile.wins.length}
        </Typography>
      </Card>
    </Box>
  );
}
