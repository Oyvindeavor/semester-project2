import React from 'react';
import { Box } from '@mui/material';
import Search from '@/components/Search';

import EndingSoonAuctionsSection from '@/components/EndingSoonSection';

export default function Home() {
  return (
    <Box>
      {/* Header */}

      {/* Search */}
      <Search />

      {/* Filter and Sort */}

      {/* Ending Soon Section */}
      <EndingSoonAuctionsSection />
    </Box>
  );
}
