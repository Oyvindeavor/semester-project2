import React from 'react';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import AuctionCard from './common/AuctionCard';
import { getTimeRemaining } from '@/utils/dateFormattings';
import { getHighestBid } from '@/utils/getHighestBid';

// Types remain the same
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
  bids: { amount?: number }[];
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings/limit=12&page=1&sort=endsAt&sortOrder=asc`
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

const EndingSoonAuctionsSection = async () => {
  const auctions = await fetchEndingSoonAuctions();
  const endingSoonAuctions: ProcessedAuction[] = auctions.map(
    (auction: Auction) => ({
      id: auction.id,
      title: auction.title,
      imageUrl: auction.media[0]?.url,
      alt: auction.media[0]?.alt || `${auction.title} auction image`,
      totalBids: auction._count.bids,
      highestBid: getHighestBid(auction.bids),
      timeLeft: getTimeRemaining(auction.endsAt),
    })
  );

  return (
    <Box
      component="section"
      aria-labelledby="ending-soon-title"
      sx={{
        py: 6,
        borderRadius: '12px 12px 0 0',
        backgroundColor: 'background.paper',
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
            id="ending-soon-title"
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
            component={'h3'}
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
          <Divider sx={{ mt: 3 }} aria-hidden="true" />
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            px: { xs: 2, md: 0 },
          }}
          role="list"
          aria-label="Auctions ending soon"
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
              role="listitem"
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

        <Divider sx={{ my: 6 }} aria-hidden="true" />

        {endingSoonAuctions.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
            role="status"
            aria-label="No auctions available"
          >
            <Typography variant="h6" color="text.secondary">
              No auctions ending soon at the moment.
            </Typography>
          </Box>
        )}
      </Container>

      {/* Status announcer for dynamic updates */}
      <div role="status" aria-live="polite" className="sr-only" />
    </Box>
  );
};

export default EndingSoonAuctionsSection;
