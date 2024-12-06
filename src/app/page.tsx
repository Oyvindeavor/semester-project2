import React from 'react';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import PopularAuctionsSection from '@/components/PopularAuctionsSection';
import EndingSoonAuctionsSection from '@/components/EndingSoonSection';
import { API_BASE, API_KEY } from '@api/config/endpoints';

console.log('[API] Starting auction listings fetch');
console.log('[ENV_CHECK]', {
  hasApiBase: !!API_BASE,
  apiBaseUrl: API_BASE,
  hasApiKey: !!API_KEY,
});

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
