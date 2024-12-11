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
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

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
        setShowMessage(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('success');
        const newPath = `${window.location.pathname}?${params.toString()}`;
        router.replace(newPath);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, searchParams, router]);

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
    if (!email) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        const callbackUrl = searchParams.get('callbackUrl') || '/';
        router.push(callbackUrl);
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
            aria-required="true"
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
            autoComplete="new-password"
            aria-required="true"
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
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link href="/register" passHref>
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
