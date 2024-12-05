'use client';
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Listing } from '@/types/api/listing';
import bidOnListing from '@/utils/api/bidOnListing';
import { useSession } from 'next-auth/react';

interface PlaceBidProps {
  listing: Listing;
}

const PlaceBid: React.FC<PlaceBidProps> = ({ listing }) => {
  const [bidAmount, setBidAmount] = useState<number | ''>(''); // State to track input value
  const id = listing.id;
  const { data: session } = useSession();

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setBidAmount(isNaN(value) ? '' : value);
  };

  const handlePlaceBid = async () => {
    if (bidAmount === '' || bidAmount <= 0) {
      console.error('Invalid bid amount');
      return;
    }

    console.log('Placing bid with amount:', bidAmount);

    if (session) {
      await bidOnListing(id, bidAmount);
    } else {
      console.error('Access token is missing');
    }
  };

  if (!session) {
    return (
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          ':hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Login to Place a Bid
      </Button>
    );
  }

  return (
    <Box>
      <TextField
        type="number"
        label="Enter your bid"
        variant="outlined"
        value={bidAmount}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        size="large"
        onClick={handlePlaceBid}
        fullWidth
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          ':hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Place bid
      </Button>
    </Box>
  );
};

export default PlaceBid;
