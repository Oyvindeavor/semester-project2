'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  SelectChangeEvent,
  InputAdornment,
  Button,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSortProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
}

interface FilterState {
  category: string;
  searchTerm: string;
}

const FilterSort = ({ onFilterChange, onSortChange }: FilterSortProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchTerm: '',
  });
  const [searchInput, setSearchInput] = useState('');
  const currentSearchTerm = searchParams.get('q');

  useEffect(() => {
    if (!searchParams.get('q')) {
      setSearchInput('');
    }
  }, [searchParams]);

  const updateURL = (params: URLSearchParams) => {
    const baseParams = new URLSearchParams();
    baseParams.set('page', '1');

    const currentSort = searchParams.get('sortOrder');
    const currentCategory = searchParams.get('_tag');

    if (currentSort) baseParams.set('sortOrder', currentSort);
    if (currentCategory) baseParams.set('_tag', currentCategory);

    params.forEach((value, key) => baseParams.set(key, value));
    router.push(`/marketplace?${baseParams.toString()}`);
  };

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    if (field === 'category') {
      setFilters({ ...filters, category: value, searchTerm: '' });

      const params = new URLSearchParams();
      if (value !== 'all') {
        params.set('_tag', value);
      }
      updateURL(params);
    }
  };

  const handleSearch = () => {
    const trimmedSearch = searchInput.trim();
    const params = new URLSearchParams();

    if (trimmedSearch) {
      params.set('q', trimmedSearch);
      setFilters({ ...filters, searchTerm: trimmedSearch });
      onFilterChange({ ...filters, searchTerm: trimmedSearch });
    }

    updateURL(params);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateURL(new URLSearchParams());
  };

  return (
    <Paper
      elevation={2}
      component="section"
      aria-label="Filter and sort options"
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'background.paper',
        color: 'white',
      }}
    >
      {currentSearchTerm && (
        <Box
          sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          role="status"
          aria-live="polite"
        >
          <Typography variant="body2" color="text.secondary">
            Showing results for `{currentSearchTerm}``
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={handleClearSearch}
            startIcon={<ClearIcon aria-hidden="true" />}
            sx={{ borderRadius: 2, textTransform: 'none', color: 'white' }}
            aria-label="Clear search results"
          >
            Clear search
          </Button>
        </Box>
      )}

      <Grid container spacing={2} role="search">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search Auctions"
            placeholder="Search auctions..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            aria-label="Search auctions"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" aria-hidden="true" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchInput && (
                    <IconButton
                      size="small"
                      onClick={() => setSearchInput('')}
                      sx={{ mr: 1 }}
                      aria-label="Clear search input"
                    >
                      <ClearIcon fontSize="small" aria-hidden="true" />
                    </IconButton>
                  )}
                  <Button
                    variant="outlined"
                    onClick={handleSearch}
                    sx={{
                      minWidth: 'unset',
                      px: 3,
                      borderRadius: 1,
                      textTransform: 'none',
                      color: 'white',
                    }}
                    aria-label="Submit search"
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Categories</InputLabel>
            <Select
              labelId="category-label"
              value={filters.category}
              label="All Categories"
              defaultValue=""
              onChange={(e) => handleFilterChange('category', e.target.value)}
              disabled={!!currentSearchTerm}
              aria-label="Filter by category"
              sx={{ color: 'white' }}
            >
              <MenuItem value="" sx={{ color: 'white' }}>
                All Categories
              </MenuItem>
              <MenuItem value="electronics" sx={{ color: 'white' }}>
                Electronics
              </MenuItem>
              <MenuItem value="art" sx={{ color: 'white' }}>
                Art
              </MenuItem>
              <MenuItem value="home" sx={{ color: 'white' }}>
                Home
              </MenuItem>
              <MenuItem value="sports" sx={{ color: 'white' }}>
                Sports
              </MenuItem>
            </Select>
            {currentSearchTerm && (
              <Typography
                variant="caption"
                color="white"
                sx={{ mt: 1, ml: 1 }}
                role="alert"
              >
                Category filter not available during search
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              defaultValue="desc&sort=created"
              label="Sort By:"
              onChange={(e: SelectChangeEvent<string>) =>
                onSortChange(e.target.value)
              }
              aria-label="Sort auctions"
              sx={{ color: 'white' }}
            >
              <MenuItem value="desc&sort=created">Newest First</MenuItem>

              <MenuItem value="asc&sort=created">Oldest first</MenuItem>
              <MenuItem value="asc&sort=endsAt">Ending Soon</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterSort;
