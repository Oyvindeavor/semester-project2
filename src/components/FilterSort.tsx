'use client';
import React, { useState } from 'react';
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
  Stack,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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

  // Reset search input when URL changes
  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (!searchQuery) {
      setSearchInput('');
    }
  }, [searchParams]);

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    if (field === 'category') {
      const newFilters = {
        ...filters,
        category: value,
        searchTerm: '',
      };
      setFilters(newFilters);

      const newParams = new URLSearchParams();
      newParams.set('page', '1');

      // Only add category if it's not 'all'
      if (value !== 'all') {
        newParams.set('_tag', value);
      }

      const currentSort = searchParams.get('sortOrder');
      if (currentSort) {
        newParams.set('sortOrder', currentSort);
      }

      // Navigate using the new params
      router.push(`/marketplace?${newParams.toString()}`);
    }
  };

  const handleSearch = () => {
    const trimmedSearch = searchInput.trim();

    if (!trimmedSearch) {
      // If search is empty, create new params without the search query
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('q'); // Remove search parameter

      const currentSort = searchParams.get('sortOrder');
      const currentCategory = searchParams.get('_tag');

      // Create clean URL with only necessary parameters
      const cleanParams = new URLSearchParams();
      cleanParams.set('page', '1');

      if (currentSort) {
        cleanParams.set('sortOrder', currentSort);
      }

      if (currentCategory) {
        cleanParams.set('_tag', currentCategory);
      }

      // Router push to non-search endpoint
      router.push(`/marketplace?${cleanParams.toString()}`);
    } else {
      // If there is a search term, proceed with normal filter update
      const newFilters = {
        ...filters,
        searchTerm: trimmedSearch,
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('q');

    const cleanParams = new URLSearchParams();
    cleanParams.set('page', '1');

    const currentSort = searchParams.get('sortOrder');
    const currentCategory = searchParams.get('_tag');

    if (currentSort) {
      cleanParams.set('sortOrder', currentSort);
    }

    if (currentCategory) {
      cleanParams.set('_tag', currentCategory);
    }

    router.push(`/marketplace?${cleanParams.toString()}`);
  };

  // Check if we're currently showing search results
  const currentSearchTerm = searchParams.get('q');

  return (
    <Box
      sx={{
        background: 'linear-gradient(145deg, #f0f4f8, #ffffff)',
        borderRadius: 3,
        boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
        p: 3,
      }}
    >
      <Stack spacing={2}>
        {currentSearchTerm && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing results for `{currentSearchTerm}`
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={handleClearSearch}
              startIcon={<ClearIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 2,
              }}
            >
              Clear search
            </Button>
          </Box>
        )}

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search auctions..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      {searchInput && (
                        <IconButton
                          size="small"
                          onClick={() => setSearchInput('')}
                          sx={{ mr: 1 }}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{
                          minWidth: 'unset',
                          px: 3,
                          borderRadius: 1,
                          textTransform: 'none',
                        }}
                      >
                        Search
                      </Button>
                    </Stack>
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
                disabled={!!currentSearchTerm}
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.12)',
                  },
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
              </Select>
              {currentSearchTerm && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, ml: 1 }}
                >
                  not avaible during search
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                defaultValue="newest"
                label="Sort By"
                onChange={(e: SelectChangeEvent<string>) =>
                  onSortChange(e.target.value)
                }
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.12)',
                  },
                }}
              >
                <MenuItem value="desc&sort=created">Newest First</MenuItem>
                <MenuItem value="asc">Price: Low to High</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="asc&sort=endsAt">Ending Soon</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default FilterSort;
