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
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material';

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

  const handleOpen = () => {
    setOpen(true);
    fetchListingDetails();
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string[],
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<string>
  ) => {
    setFormData((prev) => ({ ...prev, tags: newValue }));
  };

  const fetchListingDetails = async () => {
    setInitializing(true);
    try {
      const listing = await fetchListingById(id);

      if (!listing) {
        throw new Error('Listing not found or failed to fetch listing details');
      }

      setFormData({
        title: listing.title,
        description: listing.description,
        tags: listing.tags || [],
        imageUrl: listing.media[0]?.url || '',
        imageAlt: listing.media[0]?.alt || '',
      });
    } catch (error) {
      console.error('Error fetching listing details:', error);
    } finally {
      setInitializing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        throw new Error(errorData.message || 'Failed to edit listing');
      }

      console.log('Listing updated successfully');
      handleClose();
    } catch (error) {
      console.error('Error updating listing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Update Listing
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-listing-modal"
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Update Listing
          </Typography>

          {initializing ? (
            <CircularProgress />
          ) : (
            <>
              <TextField
                label="Title"
                name="title"
                fullWidth
                margin="normal"
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
                margin="normal"
                value={formData.description}
                onChange={handleInputChange}
                required
              />

              <Autocomplete
                multiple
                options={predefinedTags}
                getOptionLabel={(option) => option}
                value={formData.tags}
                onChange={handleTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Select or add tags"
                    margin="normal"
                    fullWidth
                  />
                )}
                freeSolo
              />

              <TextField
                label="Image URL"
                name="imageUrl"
                fullWidth
                margin="normal"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter the image URL"
              />

              <TextField
                label="Image Alt Text"
                name="imageAlt"
                fullWidth
                margin="normal"
                value={formData.imageAlt}
                onChange={handleInputChange}
                placeholder="Enter alternative text for the image"
              />
            </>
          )}

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || initializing}
            >
              {loading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
});

export default UpdateListingForm;
