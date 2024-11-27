'use client';

import { useAuth } from '@/context';
import { Box, Button, FormLabel, Input } from '@mui/joy';

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
        _wins: user._wins,
        _listings: user._listings,
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
      sx={{ margin: '0 auto', width: '400px' }}
      component="form"
      onSubmit={handleSubmit}
    >
      <FormLabel htmlFor="bio">Bio:</FormLabel>
      <Input name="bio" type="text" placeholder="Enter your bio" required />
      <FormLabel htmlFor="avatar">Avatar URL:</FormLabel>
      <Input name="avatar" type="url" placeholder="Enter avatar URL" required />
      <FormLabel htmlFor="banner">Banner URL:</FormLabel>
      <Input name="banner" type="url" placeholder="Enter banner URL" required />
      <Button type="submit" sx={{ marginTop: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
}
