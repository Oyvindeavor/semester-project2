'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput,
  IconButton,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

dayjs.locale('nb');

export default function CreateAuctionForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    media: [{ url: '', alt: '' }],
    endsAt: dayjs(),
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setError(null);
      setFormData((prev) => ({ ...prev, endsAt: newValue }));
    }
  };

  const handleMediaChange = (index: number, field: string, value: string) => {
    setError(null);
    const newMedia = [...formData.media];
    newMedia[index] = { ...newMedia[index], [field]: value };
    setFormData((prev) => ({ ...prev, media: newMedia }));
  };

  const addMediaField = () => {
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, { url: '', alt: '' }],
    }));
  };

  const removeMediaField = (index: number) => {
    if (formData.media.length > 1) {
      setFormData((prev) => ({
        ...prev,
        media: prev.media.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const auctionData = {
        ...formData,
        endsAt: formData.endsAt.toISOString(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/create`,
        {
          method: 'POST',
          body: JSON.stringify(auctionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create auction');
      }

      const result = await response.json();
      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/listing/${result.data.id}`
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to create auction'
      );
      const errorElement = document.getElementById('form-error');
      errorElement?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 4 }}
        role="form"
        aria-label="Create auction form"
        bgcolor={'primary'}
      >
        {error && (
          <Alert severity="error" id="form-error" tabIndex={-1} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Title */}
          <TextField
            label="Title"
            name="title"
            required
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter auction title"
          />

          {/* Description */}
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter auction description"
          />

          {/* Tags */}
          <FormControl fullWidth>
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              multiple
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value as string[],
                }))
              }
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              sx={{ mt: 1 }}
            >
              {['Electronics', 'Art', 'Home', 'Sports'].map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Media */}
          {formData.media.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="flex-start"
            >
              <Stack spacing={2} sx={{ flex: 1 }}>
                <TextField
                  label={`Image ${index + 1} URL`}
                  fullWidth
                  value={item.url}
                  onChange={(e) =>
                    handleMediaChange(index, 'url', e.target.value)
                  }
                  placeholder="Enter image URL"
                  required
                />
                <TextField
                  label={`Image ${index + 1} Description`}
                  fullWidth
                  value={item.alt}
                  onChange={(e) =>
                    handleMediaChange(index, 'alt', e.target.value)
                  }
                  placeholder="Enter image description"
                  required
                />
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {formData.media.length > 1 && (
                  <IconButton
                    onClick={() => removeMediaField(index)}
                    color="error"
                    size="small"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <DeleteIcon aria-hidden="true" />
                  </IconButton>
                )}
                {index === formData.media.length - 1 && (
                  <IconButton
                    onClick={addMediaField}
                    color="success"
                    size="small"
                    aria-label="Add another image"
                  >
                    <AddIcon aria-hidden="true" />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          ))}

          {/* End Date and Time */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End Date and Time"
              value={formData.endsAt}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                },
              }}
            />
          </LocalizationProvider>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            sx={{ mt: 2, color: 'white' }}
          >
            {isSubmitting ? 'Creating...' : 'Create Auction'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
