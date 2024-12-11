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
import { useBids } from './BidsContext';

interface CustomTableProps {
  listing: Listing;
}

const CustomTable: React.FC<CustomTableProps> = ({ listing }) => {
  const { data: session } = useSession();
  const { bids } = useBids();

  const sortedBids = [...(bids || [])].sort((a, b) => b.amount - a.amount);

  if (!session) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bids
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to view bids
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Bids
      </Typography>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Bidder</TableCell>
              <TableCell align="right">Bid Amount</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBids.length > 0 ? (
              sortedBids.map((bid) => (
                <TableRow
                  key={bid.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={bid.bidder.avatar.url}
                        alt={bid.bidder.name || 'Unknown'}
                        sx={{
                          width: 32,
                          height: 32,
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Typography variant="body2">
                        {bid.bidder.name || 'Unknown'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="600">
                      ${bid.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary">
                      {new Date(bid.created).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="text.secondary">
                    No bids available yet
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTable;
