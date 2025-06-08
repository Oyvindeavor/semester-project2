'use client';
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
        backgroundImage:
          'url(https://plus.unsplash.com/premium_photo-1658506826316-f21670ec809e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF1Y3Rpb258ZW58MHx8MHx8fDA%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        position: 'relative',
        height: '40vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: '12px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          py: 6,
          px: 3,
        }}
      >
        {/* Hero Title */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.8rem', sm: '3.75rem', md: '4.5rem' },
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            mb: 2,
          }}
          aria-label="Bid Swiftly on the Best Auctions"
        >
          Bid{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Swiftly
          </Box>{' '}
          on the Best Auctions
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            mb: 4,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 1px 4px rgba(0,0,0,0.7)',
          }}
        >
          Find unique treasures and bid on your favorite items in the
          marketplace.
        </Typography>

        {/* Enhanced Call-to-Action Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewMarketplace}
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: { xs: 3, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: '50px',
            color: 'white',
            background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
            transition:
              'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
            },
          }}
          aria-label="View Marketplace"
        >
          View Marketplace
        </Button>
      </Container>
    </Box>
  );
}
