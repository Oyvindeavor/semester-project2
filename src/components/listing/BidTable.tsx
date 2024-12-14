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
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const sortedBids = [...(bids || [])].sort((a, b) => b.amount - a.amount);

  if (!session) {
    return (
      <Paper
        elevation={0}
        component="section"
        aria-label="Bids section - Sign in required"
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Bids
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to view bids
        </Typography>
      </Paper>
    );
  }

  if (isMobile) {
    return (
      <Paper
        elevation={0}
        component="section"
        aria-label="Bids history"
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          mb: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Bids
        </Typography>
        <Stack spacing={2} divider={<Divider flexItem />}>
          {sortedBids.length > 0 ? (
            sortedBids.map((bid) => (
              <Box key={`bid-${bid.id}`}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      src={bid.bidder.avatar.url}
                      alt=""
                      aria-hidden="true"
                      sx={{
                        width: 32,
                        height: 32,
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Typography variant="body1">
                      {bid.bidder.name || 'Unknown'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pl: 5, // Align with the text next to avatar
                    }}
                  >
                    <Typography variant="body1" fontWeight="600">
                      ${bid.amount.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(bid.created).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary" align="center">
              No bids available yet
            </Typography>
          )}
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      component="section"
      aria-label="Bids history"
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        id="bids-table-title"
      >
        Bids
      </Typography>
      <TableContainer>
        <Table
          size="medium"
          aria-labelledby="bids-table-title"
          role="table"
          sx={{ tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              <TableCell role="columnheader" scope="col" sx={{ width: '40%' }}>
                Bidder
              </TableCell>
              <TableCell
                role="columnheader"
                scope="col"
                align="right"
                sx={{ width: '30%' }}
              >
                Bid Amount
              </TableCell>
              <TableCell
                role="columnheader"
                scope="col"
                align="right"
                sx={{ width: '30%' }}
              >
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBids.length > 0 ? (
              sortedBids.map((bid) => (
                <TableRow
                  key={`bid-${bid.id}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <TableCell
                    role="cell"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      component="div"
                      aria-label={`Bid by ${bid.bidder.name || 'Unknown'}`}
                    >
                      <Avatar
                        src={bid.bidder.avatar.url}
                        alt=""
                        aria-hidden="true"
                        sx={{
                          width: 32,
                          height: 32,
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {bid.bidder.name || 'Unknown'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell role="cell" align="right">
                    <Typography variant="body2" fontWeight="600">
                      ${bid.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell role="cell" align="right">
                    <Typography variant="body2" color="text.secondary">
                      {new Date(bid.created).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" role="cell">
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
