import { Box, Divider, Typography } from '@mui/material';
import CreateAuctionForm from '@/components/forms/createAuction';
import { Metadata } from 'next';
import Container from '@mui/material/Container';

export const metadata: Metadata = {
  title: 'Create Auction | Peregrine Auctions',
  description: 'Create a new auction listing',
};

export default function CreatePage() {
  return (
    <Container maxWidth="sm">
      <Box
        component="section"
        role="region"
        aria-label="Create auction"
        sx={{ mx: 'auto', p: 4 }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
          tabIndex={0}
        >
          Create Auction
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <CreateAuctionForm />

        <div role="status" aria-live="polite" className="sr-only" />
      </Box>
    </Container>
  );
}
