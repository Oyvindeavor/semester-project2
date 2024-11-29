import { Listing } from '@/types/api/listing';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

interface AuctionDetailsProps {
  listing: Listing;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ listing }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography level="h4" fontWeight="bold">
        {listing.title || 'Auction Title'}
      </Typography>
      <Typography level="body-sm" textColor="text.secondary" sx={{ mb: 2 }}>
        Ends At: <strong>{new Date(listing.endsAt).toLocaleString()}</strong>
      </Typography>
      <Typography level="body-md" sx={{ mb: 2 }}>
        Description:{' '}
        <strong>{listing.description || 'No description available'}</strong>
      </Typography>
      <Typography level="body-md" sx={{ mb: 4 }}>
        Total Bids: <strong>{listing._count.bids || 0}</strong>
      </Typography>
    </Box>
  );
};

export default AuctionDetails;
