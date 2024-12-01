import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Listing } from '@/types/api/FetchListingResponse';

interface CustomCardProps {
  listing: Listing;
}

const CustomCard: React.FC<CustomCardProps> = ({ listing }) => {
  return (
    <Card
      sx={{
        width: 320,
        margin: '0 auto',
        boxShadow: 4,
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        ':hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        overflow: 'hidden',
      }}
    >
      {/* Media */}
      <CardMedia
        component="img"
        height="180"
        image={listing.media[0].url || '/placeholder.jpg'}
        alt={listing.media[0]?.alt || 'Listing Image'}
        sx={{
          objectFit: 'cover',
        }}
      />

      {/* Content */}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {listing.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {listing.description || 'No description available'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
