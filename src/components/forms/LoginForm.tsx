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
import { useAuth } from '@/context';

export default function LoginForm() {
  const { setAuthData } = useAuth(); // Accessing the setAuthData function from the context
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
    const errors: { email?: string; password?: string } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Start loading state
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Invalid email or password.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Use setAuthData to store both accessToken and user in context and localStorage
      setAuthData(data.accessToken, data.user);

      router.push('/profile');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
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
          Dont have an account?{' '}
          <Link href="/register" passHref>
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
