import { Metadata } from 'next';
import RegisterForm from '@components/forms/RegisterForm';
import { Box, Typography, Container, Divider } from '@mui/material';

// Page-specific metadata
export const metadata: Metadata = {
  title: 'Register | Peregrine Auctions',
  description:
    'Create your account to start bidding on unique items at Peregrine Auctions.',
  robots: 'noindex',
};

export default function RegisterPage() {
  return (
    <Container maxWidth="sm">
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
          }}
        >
          Create Your Account
        </Typography>{' '}
        <Divider sx={{ mb: 4 }} />
        {/* Form Container */}
        <Box
          component="div"
          sx={{
            width: '100%',
            mt: 2,
          }}
          aria-label="Registration form"
        >
          <RegisterForm />
        </Box>
      </Box>
    </Container>
  );
}
