'use client';

import React from 'react';
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditProfileModal from '../forms/EditProfileForm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

interface ProfileHeaderProps {
  username?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bio?: string;
  totalAuctions?: number;
  totalBids?: number;
  credits?: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username = 'JohnDoe',
  avatarUrl = '/default-avatar.jpg',
  bannerUrl = '/default-banner.jpg',
  bio = 'Passionate collector and auction enthusiast',
  totalAuctions = 24,
  totalBids = 156,
  credits = 1000,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="header" role="banner" aria-label="Profile header">
      <Box
        role="img"
        aria-label="Profile banner"
        sx={{
          height: { xs: 200, sm: 250, md: 300 },
          width: '100%',
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          mb: 3,
          position: 'relative',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8))',
            borderRadius: 3,
          }}
        />
      </Box>

      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            bgcolor: 'background.paper',
            p: { xs: 2, sm: 3 },
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                alt={`${username}'s profile picture`}
                src={avatarUrl}
                sx={{
                  width: { xs: 120, sm: 140, md: 160 },
                  height: { xs: 120, sm: 140, md: 160 },
                  border: '4px solid white',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              />
              {isMobile && (
                <Box sx={{ position: 'absolute', right: -140, top: -8 }}>
                  <EditProfileModal />
                </Box>
              )}
            </Box>

            <Box
              sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}
              component="article"
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', sm: 'space-between' },
                  mb: 2,
                }}
              >
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  component="h1"
                  fontWeight={700}
                >
                  {username}
                </Typography>
                {!isMobile && <EditProfileModal />}
              </Box>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  mb: 3,
                  color: 'text.secondary',
                  maxWidth: '600px',
                }}
              >
                {bio}
              </Typography>

              <Stack
                direction="row"
                spacing={{ xs: 3, sm: 4 }}
                sx={{
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                }}
                component="dl"
              >
                <Box component="div">
                  <Typography component="h2" variant="h6" fontWeight={600}>
                    {totalAuctions}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="dd"
                  >
                    Auctions
                  </Typography>
                </Box>
                <Box component="div">
                  <Typography component="h2" variant="h6" fontWeight={600}>
                    {totalBids}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="dd"
                  >
                    Bids
                  </Typography>
                </Box>
                <Box component="div">
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    component="dt"
                  >
                    <Typography component="h2" variant="h6" fontWeight={600}>
                      {credits}
                    </Typography>
                    <MonetizationOnIcon
                      sx={{ color: 'warning.main' }}
                      aria-hidden="true"
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="dd"
                  >
                    Credits
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfileHeader;
