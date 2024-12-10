'use client';
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
} from '@mui/material';
import { Listing } from '@/types/api/listing';
import { useSession } from 'next-auth/react';

interface CustomTableProps {
  listing: Listing;
}

const CustomTable: React.FC<CustomTableProps> = ({ listing }) => {
  const { data: session } = useSession();

  const sortedBids = [...(listing.bids || [])].sort(
    (a, b) => b.amount - a.amount
  );

  if (!session) {
    return (
      <Box
        component={Paper}
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          overflowX: 'auto',
        }}
      >
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Bids
        </Typography>
        <Typography variant="body1" gutterBottom>
          Login to view bids.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component={Paper}
      sx={{
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        overflowX: 'auto',
        mb: 15,
      }}
    >
      <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
        Bids
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bidder</TableCell>
              <TableCell>Bid Amount</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBids.length > 0 ? (
              sortedBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={`${bid.bidder.avatar.url}`}
                        alt={bid.bidder.name || 'Unknown'}
                      />
                      {bid.bidder.name || 'Unknown'}
                    </Box>
                  </TableCell>
                  <TableCell>${bid.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(bid.created).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No bids available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
