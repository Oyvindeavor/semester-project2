import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import AuctionCard from './AuctionCard';
import { getTimeRemaining } from '@/utils/dateFormattings';

interface Media {
  url: string;
  alt?: string;
}

interface Auction {
  id: string;
  title: string;
  media: Media[];
  endsAt: string;
  _count: {
    bids: number;
  };
}

interface ProcessedAuction {
  id: string;
  title: string;
  imageUrl?: string;
  alt: string;
  totalBids: number;
  highestBid: number;
  timeLeft: string;
}

async function fetchPopularAuctionsSection(): Promise<Auction[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings/search?limit=8&page=1&sortOrder=desc`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}

const PopularAuctionsSection = async () => {
  const auctions = await fetchPopularAuctionsSection();
  const popularAuctions: ProcessedAuction[] = auctions.map(
    (auction: Auction) => ({
      id: auction.id,
      title: auction.title,
      imageUrl: auction.media[0]?.url,
      alt: auction.media[0]?.alt || `${auction.title} auction image`,
      totalBids: auction._count.bids,
      highestBid: 0,
      timeLeft: getTimeRemaining(auction.endsAt),
    })
  );

  return (
    <Box
      sx={{
        background:
          'linear-gradient(180deg, rgba(249,250,251,0.3) 0%, rgba(255,255,255,0.5) 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'primary.main',
              },
            }}
          >
            Popular Auctions
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              mt: 3,
              fontWeight: 400,
            }}
          >
            Discover our most sought-after items and join the bidding
            excitement!
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            px: { xs: 2, md: 0 },
          }}
        >
          {popularAuctions.map((auction) => (
            <Grid
              item
              key={auction.id}
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
                  title={auction.title}
                  imageUrl={auction.imageUrl}
                  totalBids={auction.totalBids}
                  highestBid={auction.highestBid}
                  timeLeft={auction.timeLeft}
                  id={auction.id}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {popularAuctions.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No popular auctions available at the moment.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PopularAuctionsSection;
