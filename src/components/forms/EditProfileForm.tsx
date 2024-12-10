// components/forms/EditProfileModal.tsx

'use client';

import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Edit } from '@mui/icons-material';

const EditProfileModal = React.memo(function EditProfileModal() {
  const { data: session, status, update } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status !== 'authenticated') {
      console.error('User not authenticated');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatar') as string;
    const bannerUrl = formData.get('banner') as string;

    if (!session) {
      console.error('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        bio,
        avatar: { url: avatarUrl, alt: '' },
        banner: { url: bannerUrl, alt: '' },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/edit`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      update();

      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(
        error instanceof Error ? error.message : 'Unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <Edit />
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal"
        aria-describedby="modal-to-edit-user-profile"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 2,
          }}
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
            defaultValue={session?.user.name || ''}
          />
          <TextField
            name="avatar"
            label="Avatar URL"
            type="url"
            placeholder="Enter avatar URL"
            required
            fullWidth
            defaultValue={session?.user?.image || ''}
          />
          <TextField
            name="banner"
            label="Banner URL"
            type="url"
            placeholder="Enter banner URL"
            required
            fullWidth
            defaultValue={session?.user.image || ''}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
});

export default EditProfileModal;
