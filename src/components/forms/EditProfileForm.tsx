'use client';

import { useAuth } from '@/context';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function EditProfileForm() {
  const { user, accessToken, setAuthData } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatar') as string;
    const bannerUrl = formData.get('banner') as string;

    console.log('Bio:', bio);
    console.log('Avatar URL:', avatarUrl);
    console.log('Banner URL:', bannerUrl);

    if (!accessToken || !user?.name) {
      console.error('User not authenticated');
      return;
    }

    try {
      const payload = {
        bio,
        avatar: {
          url: avatarUrl,
          alt: '',
        },
        banner: {
          url: bannerUrl,
          alt: '',
        },
      };

      const response = await fetch('/api/profile/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-User-Name': user.name,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      console.log('Profile updated successfully:', data.message);
      alert('Profile updated successfully');

      // Update user context and localStorage with updated user data (to reflect changes without reload)
      const updatedUser = {
        name: user.name,
        email: user.email,
        bio: bio || user.bio,
        credits: user.credits,
        avatar: {
          url: avatarUrl || user.avatar.url,
          alt: user.avatar.alt,
        },
        banner: {
          url: bannerUrl || user.banner.url,
          alt: user.banner.alt,
        },
        wins: user.wins,
        listings: user.listings,
      };

      // Set the new user data in context and localStorage
      setAuthData(accessToken, updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(
        error instanceof Error ? error.message : 'Unexpected error occurred'
      );
    }
  };

  return (
    <Box
      sx={{
        margin: '0 auto',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Edit Profile
      </Typography>
      <TextField
        name="bio"
        label="Bio"
        type="text"
        placeholder="Enter your bio"
        required
        fullWidth
      />
      <TextField
        name="avatar"
        label="Avatar URL"
        type="url"
        placeholder="Enter avatar URL"
        required
        fullWidth
      />
      <TextField
        name="banner"
        label="Banner URL"
        type="url"
        placeholder="Enter banner URL"
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Edit Profile
      </Button>
    </Box>
  );
}
