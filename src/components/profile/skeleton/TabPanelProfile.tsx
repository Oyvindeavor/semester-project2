import React from 'react';
import {
  Box,
  Skeleton,
  Container,
  Card,
  CardContent,
  Paper,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';

const TabPanelProfileLoading = () => {
  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        component="section"
        aria-label="Loading auction listings"
        sx={{
          width: 'sm',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          margin: 'auto',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={0}
            aria-label="Loading auction categories"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'white',
              },
              '& .Mui-selected': {
                color: 'white',
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'white',
              },
            }}
          >
            <Tab
              label={<Skeleton width={140} />}
              disabled
              id="loading-tab-0"
              aria-controls="loading-tabpanel-0"
            />
            <Tab
              label={<Skeleton width={140} />}
              disabled
              id="loading-tab-1"
              aria-controls="loading-tabpanel-1"
            />
          </Tabs>
        </Box>

        {/* Loading Tab Panel */}
        <Box role="tabpanel" sx={{ p: 3 }}>
          <Grid
            container
            spacing={3}
            role="list"
            aria-label="Loading auction listings"
          >
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ bgcolor: 'grey.200' }}
                  />
                  <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Box sx={{ mt: 2 }}>
                      <Skeleton variant="text" width="80%" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TabPanelProfileLoading;
