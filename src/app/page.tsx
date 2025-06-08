import React from 'react';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import EndingSoonAuctionsSection from '@/components/EndingSoonSection';
import { Metadata } from 'next';
import Hero from '@/components/hero';

export const metadata: Metadata = {
  title: 'Home | Peregrine Auctions',
  description:
    'Browse and bid on exclusive items at Peregrine Auctions. Find unique treasures and participate in live auctions.',

  openGraph: {
    title: 'Home | Peregrine Auctions',
    description:
      'Browse and bid on exclusive items at Peregrine Auctions. Find unique treasures and participate in live auctions.',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Home | Peregrine Auctions',
    description:
      'Browse and bid on exclusive items at Peregrine Auctions. Find unique treasures and participate in live auctions.',
  },

  keywords: 'auctions, online bidding, collectibles, antiques, live auctions',
};

export default function Home() {
  return (
    <Box
      component="section"
      role="region"
      aria-label="Auction listings and search"
    >
      {/* Hero section */}
      <Box
        component="section"
        role="region"
        aria-label="Hero section"
        sx={{ mb: 4 }}
      >
        <Hero />
      </Box>

      {/* Search Section */}
      <Box
        component="section"
        role="search"
        aria-label="Auction search"
        sx={{ mb: 4 }}
      >
        <Search />
      </Box>

      {/* Ending Soon Section */}
      <Box component="section" role="region" aria-label="Auctions ending soon">
        <EndingSoonAuctionsSection />
      </Box>
    </Box>
  );
}
