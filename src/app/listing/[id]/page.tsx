import { fetchListingById } from '@/utils/api/fetchListingById';
import React from 'react';
import { Box, Alert } from '@mui/material';
import AuctionDetails from '@/components/listing/AuctionDetails';
import BidTable from '@/components/listing/BidTable';
import PlaceBid from '@/components/listing/placeBid';
import { BidsProvider } from '@/components/listing/BidsContext';

export default async function ListingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  try {
    const listing = await fetchListingById(id);

    if (!listing) {
      return (
        <Box component="main" role="main" aria-label="Listing not found">
          <Alert severity="error" role="alert">
            Listing not found
          </Alert>
        </Box>
      );
    }

    return (
      <BidsProvider initialBids={listing.bids || []}>
        <Box
          component="main"
          role="main"
          aria-label={`Auction details for ${listing.title}`}
          sx={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              gap: 4,
            }}
          >
            <AuctionDetails listing={listing} aria-label="Auction details" />

            <PlaceBid listing={listing} aria-label="Place bid section" />

            <BidTable listing={listing} aria-label="Bid history" />
          </Box>

          {/* Screen reader announcer for bid updates */}
          <div role="status" aria-live="polite" className="sr-only" />
        </Box>
      </BidsProvider>
    );
  } catch (error) {
    console.error('Error fetching listing:', error);
    return (
      <Box component="main" role="main" aria-label="Error">
        <Alert severity="error" role="alert">
          Failed to load auction listing. Please try again later.
        </Alert>
      </Box>
    );
  }
}
