import React from 'react';
import { Box, Skeleton, Container, Paper } from '@mui/material';

const ProfileLoading = () => {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Profile Avatar */}
        <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />

        {/* Name */}
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />

        {/* Email/Contact Info */}
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 3 }} />

        {/* Bio Section */}
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>

        {/* Additional Info Blocks */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: 2,
            mt: 3,
          }}
        >
          <Skeleton variant="rectangular" width="50%" height={100} />
          <Skeleton variant="rectangular" width="50%" height={100} />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: 2,
            mt: 3,
            justifyContent: 'center',
          }}
        >
          <Skeleton variant="rectangular" width={120} height={36} />
          <Skeleton variant="rectangular" width={120} height={36} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileLoading;
