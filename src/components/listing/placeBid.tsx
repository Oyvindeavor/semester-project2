'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Listing } from '@/types/api/listing';
import bidOnListing from '@/utils/api/bidOnListing';
import { useSession } from 'next-auth/react';
import { MonetizationOn, Lock } from '@mui/icons-material';
import { useBids } from './BidsContext';

interface PlaceBidProps {
  listing: Listing;
}

const PlaceBid: React.FC<PlaceBidProps> = ({ listing }) => {
  const [bidAmount, setBidAmount] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: session } = useSession();
  const { addBid } = useBids();

  const currentHighestBid =
    listing.bids && listing.bids.length > 0
      ? Math.max(...listing.bids.map((bid) => bid.amount))
      : 0;

  const minimumBid = currentHighestBid + 1;

  const validateBid = (amount: number): string | null => {
    if (isNaN(amount) || amount === 0) {
      return 'Please enter a valid bid amount';
    }
    if (amount <= currentHighestBid) {
      return `Bid must be higher than the current highest bid (${currentHighestBid})`;
    }
    if (amount < minimumBid) {
      return `Minimum bid amount is ${minimumBid}`;
    }
    return null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBidAmount(value === '' ? '' : parseFloat(value));
    setError(null);
    setIsSuccess(false);
  };

  const handlePlaceBid = async () => {
    if (typeof bidAmount !== 'number') {
      setError('Please enter a valid bid amount');
      return;
    }

    const validationError = validateBid(bidAmount);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (session) {
        const newBid = await bidOnListing(listing.id, bidAmount);
        setIsSuccess(true);
        setBidAmount('');

        addBid({
          id: newBid.id,
          amount: bidAmount,
          created: new Date().toISOString(),
          bidder: {
            name: session.user?.name || 'Unknown',
            email: session.user?.email || 'Unknown',
            bio: 'No bio available',
            banner: {
              url: '',
              alt: 'No banner available',
            },
            avatar: {
              url: session.user?.image || '',
              alt: session.user?.name || 'Unknown',
            },
          },
        });
      } else {
        setError('Please login to place a bid');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place bid');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'primary.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.200',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Lock sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h6" align="center" color="primary.main">
            Sign in to Place a Bid
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            href="/api/auth/signin"
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" gutterBottom>
          Place Your Bid
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Bid placed successfully!
          </Alert>
        )}

        <TextField
          type="number"
          label="Bid Amount"
          variant="outlined"
          value={bidAmount}
          onChange={handleInputChange}
          fullWidth
          error={!!error}
          disabled={isSubmitting}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOn color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                display: 'none',
              },
          }}
        />

        {currentHighestBid > 0 && (
          <Typography variant="body2" color="text.secondary">
            Current highest bid: ${currentHighestBid.toFixed(2)}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handlePlaceBid}
          disabled={isSubmitting || bidAmount === '' || !!error}
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Place Bid'
          )}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PlaceBid;
