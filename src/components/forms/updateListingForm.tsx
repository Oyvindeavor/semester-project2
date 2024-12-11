'use client';

import React, { useState, memo } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
  Paper,
  Stack,
  IconButton,
  Alert,
  Fade,
} from '@mui/material';
import { Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';
import { fetchListingById } from '@/utils/api/fetchListingById';

const predefinedTags = [
  'Electronics',
  'Furniture',
  'Books',
  'Clothing',
  'Sports',
] as const;

interface FormData {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
}

const UpdateListingForm = memo(function UpdateListingForm({
  id,
}: {
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    tags: [],
    imageUrl: '',
    imageAlt: '',
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setOpen(true);
    fetchListingDetails();
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleTagsChange = (
    _: React.ChangeEvent<unknown>,
    newValue: string[]
  ) => {
    setFormData((prev) => ({ ...prev, tags: newValue }));
  };

  const fetchListingDetails = async () => {
    setInitializing(true);
    try {
      const listing = await fetchListingById(id);
      if (!listing) throw new Error('Listing not found');

      setFormData({
        title: listing.title,
        description: listing.description,
        tags: listing.tags || [],
        imageUrl: listing.media[0]?.url || '',
        imageAlt: listing.media[0]?.alt || '',
      });
    } catch (error) {
      setError('Failed to fetch listing details');
      console.error('Error:', error);
    } finally {
      setInitializing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/edit/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update listing');
      }

      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to update listing'
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
        sx={{
          borderRadius: 1,
          textTransform: 'none',
        }}
      >
        Edit
      </Button>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 500 },
              maxHeight: '90vh',
              overflow: 'auto',
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
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  Update Listing
                </Typography>
                <IconButton onClick={handleClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {initializing ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="Title"
                      name="title"
                      fullWidth
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      fullWidth
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />

                    <Autocomplete
                      multiple
                      options={predefinedTags}
                      value={formData.tags}
                      onChange={handleTagsChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tags"
                          placeholder="Select or add tags"
                        />
                      )}
                      freeSolo
                      ChipProps={{
                        sx: {
                          bgcolor: 'primary.50',
                          '& .MuiChip-deleteIcon': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    />

                    <TextField
                      label="Image URL"
                      name="imageUrl"
                      fullWidth
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="Enter the image URL"
                    />

                    <TextField
                      label="Image Alt Text"
                      name="imageAlt"
                      fullWidth
                      value={formData.imageAlt}
                      onChange={handleInputChange}
                      placeholder="Enter alternative text for the image"
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
                        {loading ? <CircularProgress size={24} /> : 'Update'}
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
});

export default UpdateListingForm;
