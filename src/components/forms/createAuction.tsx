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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nb'; // Norwegian locale
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';

// Set Norwegian locale globally for Day.js
dayjs.locale('nb');

export default function CreateAuctionForm() {
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    media: [{ url: '', alt: '' }],
    endsAt: dayjs(),
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        endsAt: newValue,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auctionData = {
        ...formData,
        endsAt: formData.endsAt.toISOString(), // Convert date to ISO format for backend
        tags: selectedTags,
      };

      console.log('Submitting Form:', auctionData);

      // POST request to /api/create
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(auctionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating auction:', errorData.message);
        alert(errorData.message || 'Failed to create auction.');
        return;
      }

      const result = await response.json();
      // get the returned id from the response
      const { id } = result.data.id;

      // Redirect to the newly created auction page
      router.push(`/listing/${id}`);
      console.log('Auction created successfully:', result);
      alert('Auction created successfully!');
    } catch (error) {
      console.error('Error creating auction:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Create Auction
      </Typography>

      {/* Title */}
      <TextField
        label="Title"
        name="title"
        required
        fullWidth
        value={formData.title}
        onChange={handleInputChange}
        margin="normal"
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
        margin="normal"
        placeholder="Enter auction description"
      />

      {/* Tags */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Tags</InputLabel>
        <Select
          multiple
          value={selectedTags}
          onChange={(e) => setSelectedTags(e.target.value as string[])}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {['Electronics', 'Fashion', 'Home', 'Toys', 'Vehicles'].map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Media */}
      <TextField
        label="Media URL"
        name="url"
        fullWidth
        value={formData.media[0].url}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            media: [{ ...prev.media[0], url: e.target.value }],
          }))
        }
        margin="normal"
        placeholder="Enter image URL"
      />
      <TextField
        label="Media Alt Text"
        name="alt"
        fullWidth
        value={formData.media[0].alt}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            media: [{ ...prev.media[0], alt: e.target.value }],
          }))
        }
        margin="normal"
        placeholder="Enter alt text for the image"
      />

      {/* Ends At */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="End Date and Time"
          value={formData.endsAt}
          onChange={handleDateChange}
          format="DD.MM.YYYY HH:mm" // Norwegian format: Day.Month.Year Hour:Minute
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
              InputLabelProps: { shrink: true },
            },
          }}
        />
      </LocalizationProvider>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Create Auction
      </Button>
    </Box>
  );
}
