'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  TuneRounded as FilterIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const AuctionSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const router = useRouter();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'art', label: 'Art' },
    { value: 'collectibles', label: 'Collectibles' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'vintage', label: 'Vintage' },
  ];

  const handleSearch = async () => {
    console.log('Searching:', { searchTerm, category });

    router.push(`/marketplace/${searchTerm}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          background: 'linear-gradient(145deg, #f0f4f8, #ffffff)',
          borderRadius: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          p: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.12)',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Select
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.12)',
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{
                height: '100%',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AuctionSearchSection;
