'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Stack,
  Alert,
  Fade,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';

const EditProfileModal = React.memo(function EditProfileModal() {
  const { data: session, status, update } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (status !== 'authenticated') {
      setError('You must be logged in to edit your profile');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatar') as string;
    const bannerUrl = formData.get('banner') as string;

    if (!session) {
      setError('Session not found');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        bio,
        avatar: { url: avatarUrl, alt: session.user?.name || 'User avatar' },
        banner: { url: bannerUrl, alt: session.user?.name || 'User banner' },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/edit`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      await update();
      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to update profile'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        startIcon={<EditIcon />}
        size="small"
        sx={{
          borderRadius: 1,
          textTransform: 'none',
          px: 2,
        }}
      >
        Edit Profile
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="edit-profile-modal"
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 450 },
              maxHeight: '90vh',
              outline: 'none',
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h6" component="h2">
                  Edit Profile
                </Typography>
                <IconButton
                  onClick={handleClose}
                  size="small"
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    name="bio"
                    label="Bio"
                    multiline
                    rows={3}
                    placeholder="Tell us about yourself"
                    defaultValue={session?.user.name || ''}
                    fullWidth
                    required
                  />

                  <TextField
                    name="avatar"
                    label="Avatar URL"
                    type="url"
                    placeholder="Enter your avatar image URL"
                    defaultValue={session?.user?.image || ''}
                    fullWidth
                    required
                    helperText="Enter a valid image URL for your profile picture"
                  />

                  <TextField
                    name="banner"
                    label="Banner URL"
                    type="url"
                    placeholder="Enter your banner image URL"
                    defaultValue={session?.user?.image || ''}
                    fullWidth
                    required
                    helperText="Enter a valid image URL for your profile banner"
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'flex-end',
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleClose}
                      disabled={loading}
                      sx={{ textTransform: 'none' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        textTransform: 'none',
                        minWidth: 100,
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
});

export default EditProfileModal;
