'use client';
import { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Container } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import searchListings from '@/utils/api/search';
import FilterSort from '@/components/FilterSort';
import AuctionCard from '@/components/AuctionCard';

interface Listing {
  id: string;
  title: string;
  media: Array<{ url: string; alt?: string }>;
  _count: {
    bids: number;
  };
  highestBid: number;
  endsAt: string;
}

interface FilterOptions {
  category: string;
  searchTerm: string;
}

export default function Marketplace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    if (query) {
      fetchListings(query);
    }
  }, [searchParams]);

  const fetchListings = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchListings(query);
      if (data) {
        setListings(data);
        console.log('Fetched listings:', data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
    setLoading(false);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (filters.category && filters.category !== 'all') {
      newParams.set('category', filters.category);
    } else {
      newParams.delete('category');
    }
    if (filters.searchTerm) {
      newParams.set('q', filters.searchTerm);
    } else {
      newParams.delete('q');
    }
    router.push(`/marketplace?${newParams.toString()}`, { scroll: false });
  };

  const handleSortChange = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      newParams.set('sort', sortValue);
    } else {
      newParams.delete('sort');
    }
    router.push(`/marketplace?${newParams.toString()}`, { scroll: false });
  };

  // Helper function to calculate time left
  const calculateTimeLeft = (endsAt: string): string => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return 'Ended';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', py: 4 }}>
        <FilterSort
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {listings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
                <AuctionCard
                  id={listing.id}
                  title={listing.title}
                  imageUrl={listing.media[0]?.url}
                  totalBids={listing._count.bids}
                  highestBid={listing.highestBid}
                  timeLeft={calculateTimeLeft(listing.endsAt)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
