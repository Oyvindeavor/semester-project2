import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import { Listing } from '@/types/api/listing';
import Avatar from '@mui/joy/Avatar';

interface CustomTableProps {
  listing: Listing;
}

const CustomTable: React.FC<CustomTableProps> = ({ listing }) => {
  const sortedBids = [...listing.bids].sort((a, b) => b.amount - a.amount); // Sort bids descending

  return (
    <Sheet
      variant="outlined"
      sx={{
        padding: 3,
        borderRadius: 'md',
        boxShadow: 'lg',
        overflowX: 'auto',
      }}
    >
      <Typography level="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Bids
      </Typography>
      <Table stripe="odd" size="sm">
        <thead>
          <tr>
            <th>Bidder</th>
            <th>Bid Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedBids.length > 0 ? (
            sortedBids.map((bid) => (
              <tr key={bid.id}>
                <td>
                  <Avatar
                    src={`${bid.bidder.avatar.url}`}
                    alt={bid.bidder.name || 'Unknown'}
                    sx={{ mr: 2 }}
                  />

                  {bid.bidder.name || 'Unknown'}
                </td>
                <td>${bid.amount.toFixed(2)}</td>
                <td>{new Date(bid.created).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>
                No bids available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default CustomTable;
