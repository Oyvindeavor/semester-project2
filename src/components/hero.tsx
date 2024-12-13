'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  const handleViewMarketplace = () => {
    router.push('/marketplace');
  };

  return (
    <Box
      component="section"
      aria-label="Hero Section"
      sx={{
        mt: 4,
        mb: 4,
        py: 6,
        px: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        textAlign: 'center',
        boxShadow: 1,
      }}
    >
      {/* Hero Title */}
      <Typography
        variant="h1"
        sx={{ mb: 2, fontWeight: 700 }}
        aria-label="Bid Swiftly on the Best Auctions"
      >
        Bid{' '}
        <Box
          component="span"
          sx={{
            color: 'yellow',
            textDecoration: 'underline',
          }}
        >
          Swiftly
        </Box>{' '}
        on the Best Auctions
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Find unique treasures and bid on your favorite items in the marketplace.
      </Typography>

      {/* Call-to-Action Button */}
      <Button
        variant="outlined"
        onClick={handleViewMarketplace}
        sx={{
          borderRadius: 16,
          px: 4,
          py: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          color: 'white',
        }}
        aria-label="View Marketplace"
      >
        View Marketplace
      </Button>
    </Box>
  );
}
