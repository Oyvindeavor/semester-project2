'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const AuctionSearchSection = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/marketplace?page=1&limit=12');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container sx={{ py: 2 }}>
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
              onKeyPress={handleKeyPress}
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
