import React from 'react';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import PopularAuctionsSection from '@/components/PopularAuctionsSection';
import EndingSoonAuctionsSection from '@/components/EndingSoonSection';

export default function Home() {
  return (
    <Box>
      {/* Header */}
      <Search />

      {/* Filter and Sort */}

      {/* Popular auctions section */}
      <PopularAuctionsSection />

      {/* Ending Soon Section */}
      <EndingSoonAuctionsSection />
    </Box>
  );
}
