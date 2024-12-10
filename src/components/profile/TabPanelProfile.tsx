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
} from '@mui/material';
import UpdateListingForm from '../forms/updateListingForm';
import Link from 'next/link';
import type { Listing } from '@/types/api/listing';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auction-tabpanel-${index}`}
      aria-labelledby={`auction-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderEmptyState = (message: string) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  const renderListing = (listing: Listing, isActive: boolean) => (
    <Card
      key={listing.id}
      sx={{
        width: 300,
        boxShadow: 3,
        borderRadius: 2,
        margin: 1,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Link
        href={`/listing/${listing.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <img
            src={
              listing.media.length > 0
                ? listing.media[0].url
                : '/default-listing.jpg'
            }
            alt={
              listing.media.length > 0 && listing.media[0].alt
                ? listing.media[0].alt
                : listing.title
            }
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" component="div">
              {listing.title}
            </Typography>
          </Box>
        </CardContent>
      </Link>
      {isActive && onDelete && (
        <CardActions>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => onDelete(listing.id)}
            disabled={deleting === listing.id}
          >
            {deleting === listing.id ? 'Deleting...' : 'Delete'}
          </Button>
          <UpdateListingForm id={listing.id} />
        </CardActions>
      )}
    </Card>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="auction tabs"
          variant="fullWidth"
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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {activeListings.length > 0
            ? activeListings.map((listing) => renderListing(listing, true))
            : renderEmptyState('No active auctions found')}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {wonListings.length > 0
            ? wonListings.map((listing) => renderListing(listing, false))
            : renderEmptyState('No won auctions found')}
        </Box>
      </TabPanel>
    </Box>
  );
}
