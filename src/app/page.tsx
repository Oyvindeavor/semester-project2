import * as React from 'react';
import { Box, Typography } from '@mui/joy';

export default function Home() {
  return (
    <Box>
      <Box>
        <Typography level="h1" sx={{ marginBottom: 2 }}>
          Test Joy UI
        </Typography>
        <Typography level-md="body" sx={{ marginBottom: 4 }}>
          This is a sample Joy UI integration with Next.js.
        </Typography>
      </Box>
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          padding: 2,
          marginTop: 4,
          backgroundColor: 'var(--joy-palette-neutral-100)',
        }}
      >
        <Typography level="body-sm">© 2024 My Joy UI App</Typography>
      </Box>
    </Box>
  );
}
