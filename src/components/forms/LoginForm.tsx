'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('success');
  const [showMessage, setShowMessage] = useState(!!successMessage);
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide the alert after 5 seconds
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Reset error states
    setFormErrors({});
    setError(null);

    // Validate form fields

    setLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        // Handle sign-in error
        setError('Invalid email or password.');
      } else {
        // Sign-in successful
        router.push('/');
      }
    } catch (err) {
      setError('An unknown error occurred');
      console.error('Sign-in error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: '400px', margin: '0 auto', padding: 3 }}>
      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && showMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            fullWidth
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            fullWidth
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
              startAdornment: <PasswordIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Dont have an account?{''}
          <Link href="/register" passHref>
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
