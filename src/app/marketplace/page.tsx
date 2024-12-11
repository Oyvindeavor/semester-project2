'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterSort from '@/components/FilterSort';
import AuctionCard from '@/components/AuctionCard';
import { getTimeRemaining } from '@/utils/dateFormattings';
import { getHighestBid } from '@/utils/getHighestBid';
import Paper from '@mui/material/Paper';

interface Bid {
  id: string;
  amount: number;
  bidder: { id: string; amount: number; bidder: []; created: string };
  created: string;
}

interface Listing {
  id: string;
  title: string;
  media: Array<{ url: string; alt?: string }>;
  _count: {
    bids: number;
  };
  bids: Bid[];
  endsAt: string;
}

interface FilterOptions {
  category: string;
  searchTerm: string;
}

interface SearchResponse {
  data: Listing[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

const ITEMS_PER_PAGE = 12;

export default function Marketplace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
    isFirstPage: true,
    isLastPage: true,
  });

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    fetchListings(page);
  }, [searchParams]);

  const constructQueryString = (page: number) => {
    const params = new URLSearchParams();
    params.append('limit', ITEMS_PER_PAGE.toString());

    // Add all other existing parameters except page
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (key !== 'page' && key !== 'limit') {
        params.append(key, value);
      }
    }

    params.set('page', page.toString());
    return params.toString();
  };

  const fetchListings = async (pageNumber: number) => {
    setLoading(true);
    try {
      const queryString = constructQueryString(pageNumber);
      const searchTerm = searchParams.get('q');

      // Choose endpoint based on whether there's a search term
      const endpoint = searchTerm
        ? `/api/listings/search/${queryString}`
        : `/api/listings/${queryString}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();

      if (data) {
        setListings(data.data);
        setPagination({
          currentPage: data.meta.currentPage,
          pageCount: data.meta.pageCount,
          totalCount: data.meta.totalCount,
          isFirstPage: data.meta.isFirstPage,
          isLastPage: data.meta.isLastPage,
        });
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    }
    setLoading(false);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', value.toString());
    newParams.set('limit', ITEMS_PER_PAGE.toString());
    router.push(`/marketplace?${newParams.toString()}`, { scroll: false });
  };

  const handleFilterChange = (filters: FilterOptions) => {
    const newParams = new URLSearchParams();

    // Set default parameters
    newParams.set('page', '1');
    newParams.set('limit', ITEMS_PER_PAGE.toString());

    // Only add search term if it's not empty
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      newParams.set('q', filters.searchTerm.trim());
    }

    if (filters.category && filters.category !== 'all') {
      newParams.set('_tag', filters.category);
    }

    // Preserve the sort order if it exists
    const currentSort = searchParams.get('sortOrder');
    if (currentSort) {
      newParams.set('sortOrder', currentSort);
    }

    const newUrl = `/marketplace?${newParams.toString()}`;

    router.push(newUrl, { scroll: false });
  };

  const handleSortChange = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      newParams.set('sortOrder', sortValue);
    } else {
      newParams.delete('sortOrder');
    }
    newParams.set('page', '1');
    newParams.set('limit', ITEMS_PER_PAGE.toString());

    const newUrl = `/marketplace?${newParams.toString()}`;

    router.push(newUrl, { scroll: false });
  };

  const startIndex = (pagination.currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(
    startIndex + listings.length - 1,
    pagination.totalCount
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <FilterSort
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2, md: 4 },
            borderRadius: '12px',
            bgcolor: 'background.paper',
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid
                container
                spacing={5}
                sx={{
                  px: { xs: 0, md: 2 },
                  py: 2,
                }}
              >
                {listings.map((listing) => (
                  <Grid
                    item
                    key={listing.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <AuctionCard
                        id={listing.id}
                        title={listing.title}
                        imageUrl={listing.media[0]?.url}
                        totalBids={listing._count.bids}
                        highestBid={getHighestBid(listing.bids)}
                        timeLeft={getTimeRemaining(listing.endsAt)}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {listings.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    mt: 6,
                    pb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Showing {startIndex}-{endIndex} of {pagination.totalCount}{' '}
                    items
                  </Typography>
                  <Pagination
                    count={pagination.pageCount}
                    page={pagination.currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    disabled={loading}
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        mx: 0.5,
                      },
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No items found.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
