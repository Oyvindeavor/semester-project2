'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

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
        avatar: {
          url: avatarUrl,
          alt: session.user?.name || 'User avatar',
        },
        banner: {
          url: bannerUrl,
          alt: session.user?.name || 'User banner',
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/edit`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update profile');
      }

      // After API success, update the session
      await update({
        user: {
          ...session.user,
          image: avatarUrl,
          bio: bio,
          imageAlt: session.user.name,
        },
      });
      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to update profile'
      );
      const errorElement = document.getElementById('modal-error');
      errorElement?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<EditIcon aria-hidden="true" />}
        size="small"
        aria-label="Edit your profile"
        sx={{ borderRadius: 1, textTransform: 'none', px: 2, color: 'white' }}
      >
        Edit Profile
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="edit-profile-title"
        aria-describedby="edit-profile-description"
      >
        <Fade in={open}>
          <Box
            role="dialog"
            aria-modal="true"
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
                <Typography id="edit-profile-title" variant="h6" component="h2">
                  Edit Profile
                </Typography>
                <IconButton
                  onClick={handleClose}
                  size="small"
                  aria-label="Close edit profile modal"
                >
                  <CloseIcon aria-hidden="true" />
                </IconButton>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  id="modal-error"
                  tabIndex={-1}
                  sx={{ mb: 2 }}
                >
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
                id="edit-profile-description"
              >
                <Stack spacing={2.5}>
                  <TextField
                    name="bio"
                    label="Bio"
                    multiline
                    rows={3}
                    placeholder="Tell us about yourself"
                    defaultValue={session?.user.bio || ''}
                    fullWidth
                  />

                  <TextField
                    name="avatar"
                    label="Avatar URL"
                    type="url"
                    placeholder="Enter your avatar image URL"
                    defaultValue={session?.user?.image || ''}
                    fullWidth
                    helperText="Enter a valid image URL for your profile picture"
                    inputProps={{
                      'aria-label': 'Avatar image URL',
                      'aria-required': 'true',
                    }}
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
                    inputProps={{
                      'aria-label': 'Banner image URL',
                      'aria-required': 'true',
                    }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'space-between',
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
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
                      aria-busy={loading}
                      sx={{
                        textTransform: 'none',
                        minWidth: 100,
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} aria-hidden="true" />
                      ) : (
                        'Save Changes'
                      )}
                      <span className="sr-only">
                        {loading ? 'Saving changes...' : ''}
                      </span>
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
