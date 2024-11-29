import React from 'react';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import { Listing } from '@/types/api/FetchListingResponse';

interface CustomCardProps {
  listing: Listing;
}

const CustomCard: React.FC<CustomCardProps> = ({ listing }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        margin: '0 auto',
        boxShadow: 'lg',
        borderRadius: 'md',
        padding: 2,
      }}
    >
      <AspectRatio ratio="16/9">
        <img
          src={listing.media[0].url || '/placeholder.jpg'}
          alt={listing.media[0]?.alt || 'Listing Image'}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      </AspectRatio>
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <Button variant="soft" size="sm" sx={{ mt: 2 }}>
        View More
      </Button>
    </Card>
  );
};

export default CustomCard;
