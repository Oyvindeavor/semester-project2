'use client';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  Chip,
  Stack,
  IconButton,
  Avatar,
} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import { getTimeRemaining, formatDate } from '@/utils/dateFormattings';
import Divider from '@mui/material/Divider';
import Image from 'next/image';

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
  const totalImages = listing.media.length;

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === listing.media.length - 1 ? 0 : prev + 1
    );
  }, [listing.media.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.media.length - 1 : prev - 1
    );
  }, [listing.media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextImage, handlePrevImage]);

  return (
    <Paper
      elevation={2}
      component="article"
      aria-label={`Auction details for ${listing.title}`}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 3,
        bgcolor: 'background.paper',
        width: '100%',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <figure>
            <Card
              elevation={0}
              role="region"
              aria-roledescription="image gallery"
              aria-label={`Image ${currentImageIndex + 1} of ${totalImages}`}
              sx={{
                position: 'relative',
                mb: 2,
                borderRadius: 2,
                bgcolor: 'grey.50',
                aspectRatio: { xs: '1/1', sm: '4/3' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  p: 2,
                }}
              >
                <Image
                  src={
                    listing.media[currentImageIndex]?.url ||
                    '/placeholder-image.jpg'
                  }
                  alt={listing.media[currentImageIndex]?.alt || listing.title}
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={currentImageIndex === 0}
                />
              </Box>

              {listing.media.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    sx={{
                      position: 'absolute',
                      left: { xs: 8, sm: 16 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'white',
                      boxShadow: 2,
                      zIndex: 2,
                      color: 'black',
                      '&:hover': {
                        bgcolor: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                      },
                      transition: 'transform 0.2s',
                    }}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    aria-label="Next image"
                    sx={{
                      position: 'absolute',
                      right: { xs: 8, sm: 16 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'white',
                      boxShadow: 2,
                      zIndex: 2,
                      color: 'black',
                      '&:hover': {
                        bgcolor: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                      },
                      transition: 'transform 0.2s',
                    }}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                </>
              )}
            </Card>

            {listing.media.length > 1 && (
              <Stack
                component="figcaption"
                direction="row"
                spacing={2}
                role="tablist"
                aria-label="Image thumbnails"
                sx={{
                  overflowX: 'auto',
                  py: 2,
                  px: { xs: 1, sm: 0 },
                  '::-webkit-scrollbar': {
                    height: 8,
                    borderRadius: 2,
                  },
                  '::-webkit-scrollbar-track': {
                    background: 'grey.100',
                    borderRadius: 2,
                  },
                  '::-webkit-scrollbar-thumb': {
                    background: 'grey.400',
                    borderRadius: 2,
                    '&:hover': {
                      background: 'grey.500',
                    },
                  },
                }}
              >
                {listing.media.map((media, index) => (
                  <Card
                    key={index}
                    role="tab"
                    tabIndex={0}
                    aria-selected={currentImageIndex === index}
                    aria-label={`View image ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCurrentImageIndex(index);
                      }
                    }}
                    sx={{
                      position: 'relative',
                      width: { xs: 70, sm: 80 },
                      height: { xs: 70, sm: 80 },
                      cursor: 'pointer',
                      flexShrink: 0,
                      borderRadius: 2,
                      border:
                        currentImageIndex === index
                          ? '2px solid'
                          : '2px solid transparent',
                      borderColor:
                        currentImageIndex === index
                          ? 'primary.main'
                          : 'transparent',
                      transition: 'all 0.2s',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Image
                        src={media.url || '/placeholder-image.jpg'}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="80px"
                      />
                    </Box>
                  </Card>
                ))}
              </Stack>
            )}
          </figure>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={3} component="section" aria-label="Auction details">
            <Stack
              component="header"
              direction="row"
              spacing={2}
              alignItems="center"
              aria-label="Seller information"
            >
              <Avatar
                src={listing.seller?.avatar.url}
                alt={`${listing.seller?.name}'s avatar`}
                sx={{
                  width: 56,
                  height: 56,
                  border: '2px solid',
                  borderColor: 'primary.light',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <PersonIcon aria-hidden="true" />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Listed by
                </Typography>
                <Typography variant="h6">
                  {listing.seller?.name || 'Anonymous'}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Box component="section" aria-label="Item details">
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {listing.title}
              </Typography>

              {listing.tags && listing.tags.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  role="list"
                  aria-label="Item tags"
                >
                  {listing.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      role="listitem"
                      sx={{
                        mb: 1,
                        bgcolor: 'primary.50',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.100' },
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Box>

            <Paper
              elevation={0}
              component="section"
              aria-label="Auction timing"
              sx={{
                bgcolor: 'warning.50',
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'warning.100',
              }}
            >
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon color="warning" aria-hidden="true" />
                  <Typography variant="h6" color="warning.dark">
                    {getTimeRemaining(listing.endsAt)}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Auction ends: {formatDate(listing.endsAt)}
                </Typography>
              </Stack>
            </Paper>

            <Box component="section" aria-label="Item description">
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <DescriptionIcon color="primary" aria-hidden="true" />
                <Typography variant="h6">Description</Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
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
