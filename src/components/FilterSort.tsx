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
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface FilterSortProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
}

interface FilterState {
  category: string;
  searchTerm: string;
}

const FilterSort = ({ onFilterChange, onSortChange }: FilterSortProps) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchTerm: '',
  });

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
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
            placeholder="Search auctions..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
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
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => handleFilterChange('category', e.target.value)}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.12)',
                },
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="home">Home & Garden</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
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
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="popular">Most Popular</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterSort;
