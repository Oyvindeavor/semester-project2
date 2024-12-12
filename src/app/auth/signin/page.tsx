import { Box, Divider, Typography } from '@mui/material';
import LoginForm from '@components/forms/LoginForm';
import { Metadata } from 'next';
import Container from '@mui/material/Container';

export const metadata: Metadata = {
  title: 'Sign In | Peregrine Auctions',
  description: 'Sign in to your Peregrine Auctions account',
  robots: 'noindex',
};

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        component="section"
        role="region"
        aria-label="Sign in"
        sx={{ mx: 'auto', p: 4 }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
          tabIndex={0}
        >
          Sign In
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <LoginForm />

        <div role="status" aria-live="polite" className="sr-only" />
      </Box>
    </Container>
  );
}
