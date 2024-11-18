'use client';

import { Box, Typography, Button } from '@mui/joy';
import styles from './page.module.scss';

export default function Home() {
  return (
    <Box className={styles.page} sx={{ padding: 2 }}>
      <Box className={styles.main} sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography level="h1" sx={{ marginBottom: 2 }}>
          Test Joy UI
        </Typography>
        <Typography level-md="body" sx={{ marginBottom: 4 }}>
          This is a sample Joy UI integration with Next.js.
        </Typography>
        <Button
          variant="solid"
          color="primary"
          onClick={() => alert('Joy UI is working!')}
        >
          Click Me
        </Button>
      </Box>
      <Box
        component="footer"
        className={styles.footer}
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
