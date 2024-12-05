import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import AuctionCard from './AuctionCard';

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

async function fetchEndingSoonAuctions(): Promise<Auction[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings/limit=10&page=1&sort=endsAt&sortOrder=asc&_active=true`
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

function calculateTimeLeft(endsAt: string): string {
  const end = new Date(endsAt);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return 'Ended';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

const EndingSoonAuctionsSection = async () => {
  const auctions = await fetchEndingSoonAuctions();
  const endingSoonAuctions: ProcessedAuction[] = auctions.map(
    (auction: Auction) => ({
      id: auction.id,
      title: auction.title,
      imageUrl: auction.media[0]?.url,
      alt: auction.media[0]?.alt || `${auction.title} auction image`,
      totalBids: auction._count.bids,
      highestBid: 0,
      timeLeft: calculateTimeLeft(auction.endsAt),
    })
  );

  return (
    <Box
      sx={{
        background:
          'linear-gradient(180deg, rgba(255,245,245,0.3) 0%, rgba(255,255,255,0.5) 100%)',
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
            Ending Soon
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
            Don&apos;t miss out on these auctions closing soon. Place your bids
            before time runs out!
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
          {endingSoonAuctions.map((auction) => (
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

        {endingSoonAuctions.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No auctions ending soon at the moment.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EndingSoonAuctionsSection;
