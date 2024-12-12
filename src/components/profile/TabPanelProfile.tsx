'use client';

import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import UpdateListingForm from '../forms/updateListingForm';
import Link from 'next/link';
import Image from 'next/image';
import type { Listing } from '@/types/api/listing';
import Container from '@mui/material/Container';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auction-tabpanel-${index}`}
      aria-labelledby={`auction-tab-${index}`}
      tabIndex={0}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 3, sm: 2, md: 2 } }}>{children}</Box>
      )}
    </div>
  );
}

interface AuctionListingProps {
  activeListings: Listing[];
  wonListings: Listing[];
  onDelete?: (id: string) => void;
  deleting?: string | null;
}

export default function AuctionTabs({
  activeListings,
  wonListings,
  onDelete,
  deleting,
}: AuctionListingProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderEmptyState = (message: string) => (
    <Paper
      elevation={0}
      role="status"
      aria-label="No auctions found"
      sx={{
        p: 5,
        textAlign: 'center',
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      <Typography
        component="h2"
        variant="h6"
        color="text.secondary"
        gutterBottom
      >
        No Auctions Found
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Paper>
  );

  const renderListing = (listing: Listing, isActive: boolean) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
      <Card
        elevation={0}
        component="article"
        aria-labelledby={`listing-title-${listing.id}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 2,
          },
          '&:focus-within': {
            outline: '2px solid currentColor',
            outlineOffset: '2px',
          },
        }}
      >
        <Link
          href={`/listing/${listing.id}`}
          style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
          aria-label={`View details for ${listing.title}`}
        >
          <Box sx={{ position: 'relative', paddingTop: '75%' }}>
            <Image
              src={listing.media[0]?.url || '/default-listing.jpg'}
              alt={`Image of ${listing.title}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Box>
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              id={`listing-title-${listing.id}`}
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {listing.title}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ gap: 1 }}
              role="list"
              aria-label="Tags"
            >
              {listing.tags?.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  role="listitem"
                  sx={{
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'primary.100' },
                  }}
                />
              ))}
            </Stack>
          </CardContent>
        </Link>

        {isActive && onDelete && (
          <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => onDelete(listing.id)}
              disabled={deleting === listing.id}
              fullWidth
              aria-busy={deleting === listing.id}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                '&:focus': {
                  outline: '2px solid currentColor',
                  outlineOffset: '2px',
                },
              }}
            >
              {deleting === listing.id ? 'Deleting...' : 'Delete'}
            </Button>
            <UpdateListingForm id={listing.id} />
          </CardActions>
        )}
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        component="section"
        aria-label="Auction listings"
        sx={{
          width: 'sm',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          margin: 'auto',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Auction categories"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:focus': {
                  outline: '2px solid currentColor',
                  outlineOffset: '-2px',
                },
              },
            }}
          >
            <Tab
              label={`Active Auctions (${activeListings.length})`}
              id="auction-tab-0"
              aria-controls="auction-tabpanel-0"
            />
            <Tab
              label={`Won Auctions (${wonListings.length})`}
              id="auction-tab-1"
              aria-controls="auction-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Grid
            container
            spacing={3}
            key="active-listings-grid"
            role="list"
            aria-label="Active auction listings"
          >
            {activeListings.length > 0 ? (
              activeListings.map((listing) => renderListing(listing, true))
            ) : (
              <Grid item xs={12} key="active-empty">
                {renderEmptyState(
                  "You don't have any active auctions at the moment."
                )}
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid
            container
            spacing={3}
            key="won-listings-grid"
            role="list"
            aria-label="Won auction listings"
          >
            {wonListings.length > 0 ? (
              wonListings.map((listing) => renderListing(listing, false))
            ) : (
              <Grid item xs={12} key="won-empty">
                {renderEmptyState("You haven't won any auctions yet.")}
              </Grid>
            )}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}
