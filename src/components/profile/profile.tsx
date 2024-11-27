'use client';

import { User } from '@/context';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context';
import EditProfileForm from '../forms/EditProfileForm';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Sheet,
  Typography,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from '@mui/joy';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface Count {
  listings: number;
  wins: number;
}

interface Profile {
  name: string;
  email: string;
  avatar: Avatar;
  banner: Banner;
  bio: string;
  venueManager: boolean;
  credits: number;
  wins: [];
  listings: [];
  _count: Count;
}

export default function Profile() {
  const { accessToken, user, loading, setAuthData } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return; // Wait until the authentication context is ready

    if (!accessToken || !user?.name) {
      setError('User not authenticated');
      return;
    }

    async function fetchProfile() {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-User-Name': user?.name || '',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile data');
        }

        const data = await response.json();
        const profile = data.profile.data;
        console.log(data.profile.data);

        setAuthData(accessToken, profile as User);
        console.log(user);
        setProfile(profile);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchProfile();
  }, [loading, accessToken, user?.name]);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }

  console.log('Profile:', profile);
  console.log('User:', user);

  return (
    <Box sx={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage: `url(${user?.banner?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          width: '100%',
          borderRadius: 'sm',
          overflow: 'hidden',
        }}
        aria-label={user?.banner?.alt || 'User banner'}
      ></Box>

      {/* Avatar and Name */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          mt: -5,
        }}
      >
        <Avatar
          src={user?.avatar?.url}
          alt={user?.avatar.alt || 'User avatar'}
          sx={{
            width: 100,
            height: 100,
            border: '5px solid',
            borderColor: 'background.surface',
          }}
        />
        <Typography level="h4" sx={{ mt: 2 }}>
          {user?.name}
        </Typography>
      </Box>

      {/* User Info */}
      <Box
        sx={{
          mt: 3,
          textAlign: 'left',
          p: 2,
          background: 'background.surface',
          borderRadius: 'md',
          boxShadow: 'sm',
        }}
      >
        <Typography level="body-md">
          <strong>Email:</strong> {profile?.email || 'Not available'}
        </Typography>
        <Typography level="body-md" sx={{ mt: 1 }}>
          <strong>Bio:</strong> {user?.bio || 'No bio available'}
        </Typography>
        <Typography level="body-md" sx={{ mt: 1 }}>
          <strong>Credits:</strong> {user?.credits || '0'}
        </Typography>
        <Typography level="body-md" sx={{ mt: 1 }}>
          <strong>Wins:</strong> {user?._wins || '0'}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined">Edit Profile</Button>
        <Button variant="solid">Create Listing</Button>
      </Box>

      {/* Active Listings Section */}
      <Box sx={{ mt: 4, textAlign: 'left', display: 'flex' }}>
        <Tabs aria-label="Icon tabs" defaultValue={0}>
          <TabList>
            <Tab>
              <PhoneIcon />
              <TabPanel>Active Listings</TabPanel>
            </Tab>
            <Tab>
              <FavoriteIcon />
              <TabPanel>Favorite Listings</TabPanel>
            </Tab>
            <Tab>
              <PersonPinIcon />
              <TabPanel>Ended Listings</TabPanel>
            </Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* Ended Auctions Section */}
      <Box sx={{ mt: 4, textAlign: 'left' }}>
        <Typography level="h4">Ended Auctions</Typography>
        <Divider sx={{ my: 1 }} />

        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          No ended auctions.
        </Typography>
      </Box>

      {/* Edit Profile Modal */}
      {/* <Modal >
        <Sheet
          sx={{
            maxWidth: '500px',
            margin: '0 auto',
            p: 4,
            borderRadius: 'md',
            boxShadow: 'lg',
          }}
        >
          <Typography level="h4" mb={2}>
            Edit Profile
          </Typography>
          <EditProfileForm />
          <Button sx={{ mt: 2 }}>Close</Button>
        </Sheet>
      </Modal> */}
    </Box>
  );
}
