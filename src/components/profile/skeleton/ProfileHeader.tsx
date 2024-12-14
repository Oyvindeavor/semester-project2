import React from 'react';
import {
  Box,
  Skeleton,
  Container,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

export default function ProfileHeaderLoading() {
  return (
    <Box aria-label="Loading Profile">
      {/* Profile Header Skeleton */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        {/* Banner Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ bgcolor: 'grey.200' }}
        />

        {/* Avatar Skeleton - Positioned absolutely like the real avatar */}
        <Box sx={{ position: 'relative', mt: -8, ml: 4 }}>
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ bgcolor: 'grey.300' }}
          />
        </Box>

        {/* Profile Info Skeleton */}
        <Box sx={{ mt: 2, p: 2 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} sx={{ mt: 1 }} />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={100} />
          </Box>
        </Box>
      </Box>

      {/* Tabs Skeleton */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Skeleton variant="rectangular" width={300} height={48} />
      </Box>

      {/* Listings Grid Skeleton */}
      <Container>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
