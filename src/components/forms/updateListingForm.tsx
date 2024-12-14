'use client';

import React, { useState, memo, useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const handleOpen = async () => {
    setOpen(true);
    await fetchListingDetails();
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
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<EditIcon aria-hidden="true" />}
        aria-label="Edit listing"
        sx={{ borderRadius: 1, textTransform: 'none' }}
      >
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="edit-listing-title"
        aria-describedby="edit-listing-description"
      >
        <Fade in={open}>
          <Box
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
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
                <Typography id="edit-listing-title" variant="h6" component="h2">
                  Update Listing
                </Typography>
                <IconButton
                  onClick={handleClose}
                  size="small"
                  aria-label="Close modal"
                >
                  <CloseIcon aria-hidden="true" />
                </IconButton>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  ref={errorRef}
                  tabIndex={-1}
                  sx={{ mb: 2 }}
                >
                  {error}
                </Alert>
              )}

              {initializing ? (
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', p: 4 }}
                  aria-label="Loading listing details"
                >
                  <CircularProgress aria-hidden="true" />
                </Box>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  aria-label="Update listing form"
                >
                  <Stack spacing={2}>
                    <TextField
                      label="Title"
                      name="title"
                      fullWidth
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      inputProps={{
                        'aria-label': 'Listing title',
                        'aria-required': 'true',
                      }}
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
                      inputProps={{
                        'aria-label': 'Listing description',
                        'aria-required': 'true',
                      }}
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
                          aria-label="Listing tags"
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
                      inputProps={{
                        'aria-label': 'Image URL',
                      }}
                    />

                    <TextField
                      label="Image Alt Text"
                      name="imageAlt"
                      fullWidth
                      value={formData.imageAlt}
                      onChange={handleInputChange}
                      placeholder="Enter alternative text for the image"
                      inputProps={{
                        'aria-label': 'Image description',
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
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Cancel update"
                        color="error"
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
                          <>
                            <CircularProgress size={24} aria-hidden="true" />
                            <span className="sr-only">Updating...</span>
                          </>
                        ) : (
                          'Update'
                        )}
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
