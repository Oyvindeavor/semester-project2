'use client';
import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Listing } from '@/types/api/listing';
import { useIsUserLoggedIn } from '@/utils/useIsUserLoggedIn';
import bidOnListing from '@/utils/api/bidOnListing';
import { useFetchAccessToken } from '@/utils/useFetchAccessToken';

interface PlaceBidProps {
  listing: Listing;
}

const PlaceBid: React.FC<PlaceBidProps> = ({ listing }) => {
  const isLoggedIn = useIsUserLoggedIn();
  const [bidAmount, setBidAmount] = useState<number | ''>(''); // State to track input value
  const id = listing.id;
  const { accessToken } = useFetchAccessToken();

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

    if (accessToken) {
      bidOnListing(id, bidAmount, accessToken);
    } else {
      console.error('Access token is missing');
    }
  };

  if (!isLoggedIn) {
    return (
      <Button
        variant="solid"
        size="lg"
        sx={{
          backgroundColor: 'primary.500',
          color: 'white',
          ':hover': {
            backgroundColor: 'primary.600',
          },
        }}
      >
        Login to Place a Bid
      </Button>
    );
  }

  return (
    <div>
      <Input
        type="number"
        placeholder="Enter your bid"
        value={bidAmount}
        onChange={handleInputChange} // Update state on input change
        sx={{ mb: 2, width: '100%' }}
      />
      <Button
        variant="solid"
        size="lg"
        onClick={handlePlaceBid} // Trigger bid function
        sx={{
          backgroundColor: 'primary.500',
          color: 'white',
          ':hover': {
            backgroundColor: 'primary.600',
          },
        }}
      >
        Place bid
      </Button>
    </div>
  );
};

export default PlaceBid;
