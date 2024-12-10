'use client';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  Chip,
  Stack,
  IconButton,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import { getTimeRemaining, formatDate } from '@/utils/dateFormattings';
import type { Listing } from '@/types/api/listing';

export interface auctionListing {
  id: string;
  title: string;
  description: string;
  media: { url: string; alt: string }[];
  tags: string[];
  endsAt: string;
  seller?: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
}

interface AuctionDetailsProps {
  listing: auctionListing;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === listing.media.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.media.length - 1 : prev - 1
    );
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, width: '100%' }}>
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {/* Image Gallery - Mobile Optimized */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              position: 'relative',
              mb: 2,
              // Use aspect ratio container for consistent image sizing
              '&::before': {
                content: '""',
                display: 'block',
                paddingTop: { xs: '100%', sm: '75%' }, // 1:1 on mobile, 4:3 on tablet/desktop
              },
            }}
          >
            <CardMedia
              component="img"
              image={
                listing.media[currentImageIndex]?.url ||
                '/placeholder-image.jpg'
              }
              alt={listing.media[currentImageIndex]?.alt || listing.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                bgcolor: 'grey.100',
              }}
            />
            {listing.media.length > 1 && (
              <>
                <IconButton
                  sx={{
                    position: 'absolute',
                    left: { xs: 8, sm: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                  onClick={handlePrevImage}
                >
                  <NavigateBeforeIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                </IconButton>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: { xs: 8, sm: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                  onClick={handleNextImage}
                >
                  <NavigateNextIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                </IconButton>
              </>
            )}
          </Card>

          {/* Thumbnail Strip - Mobile Optimized */}
          {listing.media.length > 1 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                overflowX: 'auto',
                pb: 1,
                px: { xs: 1, sm: 0 },
                '::-webkit-scrollbar': {
                  height: '8px',
                },
                '::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '4px',
                },
                '::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                },
                '::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              {listing.media.map((media, index) => (
                <Card
                  key={index}
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid' : 'none',
                    borderColor: 'primary.main',
                    flexShrink: 0,
                    borderRadius: 1,
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    image={media.url || '/placeholder-image.jpg'}
                    alt={media.alt || `Image ${index + 1}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Auction Details - Mobile Optimized */}
        <Grid item xs={12} md={5}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            {/* Title and Seller Info */}
            <Box>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Avatar
                  src={listing.seller?.avatar.url}
                  alt={listing.seller?.avatar.alt}
                  sx={{
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography variant="subtitle1" color="text.secondary">
                  {listing.seller?.name}
                </Typography>
              </Stack>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                {listing.title}
              </Typography>

              {listing.tags && listing.tags.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mb: 2,
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  {listing.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              )}
            </Box>

            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 1 }}
              >
                <AccessTimeIcon color="action" />
                <Typography variant="subtitle1" color="text.secondary">
                  {getTimeRemaining(listing.endsAt)}
                </Typography>
              </Stack>

              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Ends at: {formatDate(listing.endsAt)}
              </Typography>
            </Box>

            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 1 }}
              >
                <DescriptionIcon color="action" />
                <Typography variant="h6">Description</Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  ml: 4,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                {listing.description || 'No description available'}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuctionDetails;
