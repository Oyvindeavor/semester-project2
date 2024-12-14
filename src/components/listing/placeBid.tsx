'use client';

import React, { useState, useEffect } from 'react';
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
      return `Bid must be higher than the current highest bid ($${currentHighestBid})`;
    }
    if (amount < minimumBid) {
      return `Minimum bid amount is $${minimumBid}`;
    }
    return null;
  };

  useEffect(() => {
    if (error) {
      const errorElement = document.getElementById('bid-error');
      errorElement?.focus();
    }
  }, [error]);

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

        // Announce success to screen readers
        const successMessage = document.getElementById('bid-success');
        successMessage?.focus();

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
        component="section"
        elevation={0}
        aria-labelledby="sign-in-title"
        sx={{
          p: 3,
          bgcolor: 'primary.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.200',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Lock
            sx={{ fontSize: 40, color: 'primary.main' }}
            aria-hidden="true"
          />
          <Typography
            id="sign-in-title"
            variant="h6"
            align="center"
            color="primary.main"
          >
            Sign in to Place a Bid
          </Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            href="/api/auth/signin"
            aria-label="Sign in to place a bid"
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
      component="form"
      elevation={0}
      role="form"
      aria-labelledby="bid-form-title"
      onSubmit={(e) => {
        e.preventDefault();
        handlePlaceBid();
      }}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack spacing={2}>
        <Typography
          id="bid-form-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Place Your Bid
        </Typography>

        {error && (
          <Alert severity="error" id="bid-error" tabIndex={-1} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isSuccess && (
          <Alert
            severity="success"
            id="bid-success"
            tabIndex={-1}
            sx={{ mb: 2 }}
          >
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
          required
          inputProps={{
            'aria-label': 'Enter bid amount',
            'aria-describedby': 'minimum-bid-help',
            min: minimumBid,
            step: '0.01',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOn color="action" aria-hidden="true" />
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
          <Typography
            variant="body2"
            color="text.secondary"
            id="minimum-bid-help"
          >
            Current highest bid: ${currentHighestBid.toFixed(2)}
            {minimumBid > currentHighestBid &&
              ` - Minimum bid required: $${minimumBid.toFixed(2)}`}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          size="small"
          onClick={handlePlaceBid}
          disabled={isSubmitting || bidAmount === '' || !!error}
          aria-busy={isSubmitting}
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" aria-hidden="true" />
          ) : (
            ''
          )}
          <span className="sr-only">
            {isSubmitting ? 'Placing bid...' : 'Place bid'}
          </span>
        </Button>
      </Stack>
    </Paper>
  );
};

export default PlaceBid;
