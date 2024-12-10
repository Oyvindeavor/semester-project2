import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import { Timer, TrendingUp, Gavel } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const AuctionCard = ({
  imageUrl = 'https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813',
  title = 'Vintage Collectible',
  totalBids = 24,
  highestBid = 1250.0,
  timeLeft = '2d 15h 30m',
  id = 'id',
}) => {
  return (
    <Link href={`/listing/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: 250,
          height: 420,
          borderRadius: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          backgroundColor: 'white',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 200,
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            backgroundColor: 'grey.100', // Loading state background
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{
              objectFit: 'cover',
            }}
            sizes="300px"
            priority={true}
            quality={75}
          />
        </Box>
        <CardContent
          sx={{
            height: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              height: '2.6rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Chip
                label={`${totalBids} Bids`}
                icon={<Gavel sx={{ fontSize: '1.2rem' }} />}
                sx={{
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.12)' },
                }}
              />
              <Chip
                label={`${highestBid}`}
                icon={
                  <MonetizationOnIcon
                    sx={{ fontSize: '1.2rem', color: 'gold' }}
                  />
                }
                color="success"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.08)' },
                }}
              />
            </Stack>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                backgroundColor: 'rgba(255, 152, 0, 0.08)',
                borderRadius: 2,
              }}
            >
              <Timer color="warning" sx={{ fontSize: '1.2rem' }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'warning.dark',
                  fontWeight: 500,
                }}
              >
                {timeLeft}
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AuctionCard;
