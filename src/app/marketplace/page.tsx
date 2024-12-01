'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function ListingsPage() {
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');
  const [gender, setGender] = useState('all');

  // Mock data for listings
  const listings = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    description: 'This is a product description.',
    price: (Math.random() * 100 + 20).toFixed(0),
    image: 'https://via.placeholder.com/300',
    discountPrice: (Math.random() * 100 + 10).toFixed(0),
  }));

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>
      <Typography variant="body2" gutterBottom>
        Home • Shop
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={2}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
            {/* Filter by Category */}
            <Typography variant="h6" gutterBottom>
              Filter by Category
            </Typography>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {['All', 'Fashion', 'Books', 'Toys', 'Electronics'].map((cat) => (
                <FormControlLabel
                  key={cat}
                  value={cat.toLowerCase()}
                  control={<Radio />}
                  label={cat}
                />
              ))}
            </RadioGroup>

            <Divider sx={{ my: 2 }} />

            {/* Sort By */}
            <Typography variant="h6" gutterBottom>
              Sort By
            </Typography>
            <RadioGroup
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {[
                'Newest',
                'Price: High-Low',
                'Price: Low-High',
                'Discounted',
              ].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option.toLowerCase()}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>

            <Divider sx={{ my: 2 }} />

            {/* Filter by Gender */}
            <Typography variant="h6" gutterBottom>
              By Gender
            </Typography>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {['All', 'Men', 'Women', 'Kids'].map((gen) => (
                <FormControlLabel
                  key={gen}
                  value={gen.toLowerCase()}
                  control={<Radio />}
                  label={gen}
                />
              ))}
            </RadioGroup>
          </Box>
        </Grid>

        {/* Main Listings */}
        <Grid item xs={12} md={9}>
          {/* Search Bar */}
          <TextField
            placeholder="Search Product"
            variant="outlined"
            fullWidth
            sx={{ mb: 4 }}
          />

          {/* Listings Grid */}
          <Grid container spacing={2}>
            {listings.map((listing) => (
              <Grid item key={listing.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={listing.image}
                    alt={listing.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      {listing.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>${listing.price}</strong>{' '}
                      <span style={{ textDecoration: 'line-through' }}>
                        ${listing.discountPrice}
                      </span>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
