import React from 'react';
import {
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import EditProfileModal from '../forms/EditProfileForm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const ProfileHeader = ({
  username = 'JohnDoe',
  avatarUrl = '/default-avatar.jpg',
  bannerUrl = '/default-banner.jpg',
  bio = 'Passionate collector and auction enthusiast',
  totalAuctions = 24,
  totalBids = 156,
  credits = 1000,
}) => {
  return (
    <Box sx={{ position: 'relative', mb: 10 }}>
      {/* Banner Image */}
      <Box
        sx={{
          height: 300,
          width: '100%',
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          position: 'relative',
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))',
            borderRadius: 3,
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Profile Content */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: -80,
            width: '100%',
            gap: 3,
          }}
        >
          {/* Avatar */}
          <Avatar
            alt={username}
            src={avatarUrl}
            sx={{
              width: 160,
              height: 160,
              border: '4px solid white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          />

          {/* Profile Details */}
          <Box sx={{ flex: 1, color: 'white' }}>
            <Typography variant="h4" fontWeight={700}>
              {username}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {bio}
            </Typography>

            {/* Profile Stats */}
            <Stack direction="row" spacing={3} sx={{ color: 'black' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {totalAuctions} Auctions
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">Credits: {credits}</Typography>
                  <MonetizationOnIcon style={{ color: 'gold' }} />
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {totalBids}
                </Typography>
                <Typography variant="body2">Bids</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2}>
            <EditProfileModal />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileHeader;
