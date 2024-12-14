'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const AuctionSearchSection = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    const path = trimmedTerm
      ? `/marketplace?q=${encodeURIComponent(trimmedTerm)}`
      : '/marketplace?page=1&limit=12';
    router.push(path);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box component="section" sx={{ width: '100%' }} aria-label="Auction search">
      <Container maxWidth={false}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="stretch"
            component="form"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <Grid item xs={12} md={10}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search auctions..."
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Search auctions"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" aria-hidden="true" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<SearchIcon aria-hidden="true" />}
                onClick={handleSearch}
                type="submit"
                sx={{
                  height: '100%',
                  minHeight: '56px',
                  textTransform: 'none',
                  boxShadow: 2,
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuctionSearchSection;
