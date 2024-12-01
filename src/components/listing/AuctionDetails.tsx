import { Listing } from '@/types/api/listing';
import { Box, Typography } from '@mui/material';

interface AuctionDetailsProps {
  listing: Listing;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ listing }) => {
  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
        {listing.title || 'Auction Title'}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Ends At: <strong>{new Date(listing.endsAt).toLocaleString()}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description:{' '}
        <strong>{listing.description || 'No description available'}</strong>
      </Typography>
      <Typography variant="body1">
        Total Bids: <strong>{listing._count?.bids || 0}</strong>
      </Typography>
    </Box>
  );
};

export default AuctionDetails;
