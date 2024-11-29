import { fetchListingById } from '@/utils/api/fetchListingById';
import React from 'react';
import { Box } from '@mui/joy';
import Card from '@components/common/listingCard';
import AuctionDetails from '@/components/listing/AuctionDetails';
import BidTable from '@/components/listing/BidTable';
import PlaceBid from '@/components/listing/placeBid';

export default async function ListingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const listing = await fetchListingById(id);

  if (!listing) {
    console.error('Listing is null or undefined');
    return <div>Listing not found</div>;
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: 4,
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
        <Card listing={listing} />
        <AuctionDetails listing={listing} />
        <PlaceBid listing={listing} />
        <BidTable listing={listing} />
      </Box>
    </Box>
  );
}