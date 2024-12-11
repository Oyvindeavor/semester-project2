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

  const commonInputStyles = {
    borderRadius: 2,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'divider',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
    >
      {currentSearchTerm && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing results for `{currentSearchTerm}`
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={handleClearSearch}
            startIcon={<ClearIcon />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Clear search
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search auctions..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
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
                </InputAdornment>
              ),
              sx: commonInputStyles,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>All Categories</InputLabel>
            <Select
              value={filters.category}
              label="All Categories"
              defaultValue="all"
              onChange={(e) => handleFilterChange('category', e.target.value)}
              disabled={!!currentSearchTerm}
              sx={commonInputStyles}
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
                Not available during search
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>All Auctions</InputLabel>
            <Select
              defaultValue="desc&sort=created"
              label="All Auctions"
              onChange={(e: SelectChangeEvent<string>) =>
                onSortChange(e.target.value)
              }
              sx={commonInputStyles}
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
    </Paper>
  );
};

export default FilterSort;
