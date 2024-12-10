'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput,
  IconButton,
  Paper,
  Stack,
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
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    tags: string[]; // Change never[] to string[]
    media: { url: string; alt: string }[];
    endsAt: dayjs.Dayjs;
  }>({
    title: '',
    description: '',
    tags: [], // Ensure this is an array of strings
    media: [{ url: '', alt: '' }],
    endsAt: dayjs(),
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        endsAt: newValue,
      }));
    }
  };

  const handleMediaChange = (index: number, field: string, value: string) => {
    const newMedia = [...formData.media];
    newMedia[index] = { ...newMedia[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      media: newMedia,
    }));
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
      console.error('Error creating auction:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Create Auction
        </Typography>

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
            <InputLabel>Tags</InputLabel>
            <Select
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
            >
              {['Electronics', 'Fashion', 'Home', 'Toys', 'Vehicles'].map(
                (tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {/* Media URLs */}
          {formData.media.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="flex-start"
            >
              <Stack spacing={2} sx={{ flex: 1 }}>
                <TextField
                  label="Image URL"
                  fullWidth
                  value={item.url}
                  onChange={(e) =>
                    handleMediaChange(index, 'url', e.target.value)
                  }
                  placeholder="Enter image URL"
                  required
                />
                <TextField
                  label="Image Description"
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
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                {index === formData.media.length - 1 && (
                  <IconButton
                    onClick={addMediaField}
                    color="primary"
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          ))}

          {/* End Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End Date and Time"
              value={formData.endsAt}
              onChange={handleDateChange}
              format="DD.MM.YYYY HH:mm"
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
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Create Auction
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
