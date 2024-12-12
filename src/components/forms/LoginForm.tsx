'use client';
import { useState, useEffect, useRef } from 'react';
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
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error || Object.keys(formErrors).length > 0) {
      errorRef.current?.focus();
    }
  }, [error, formErrors]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('success');
        router.replace(`${window.location.pathname}?${params.toString()}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, searchParams, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setFormErrors({});
    setError(null);

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
    <Card
      component="section"
      role="section"
      aria-labelledby="login-title"
      sx={{ padding: 3 }}
    >
      <form onSubmit={handleSubmit} noValidate aria-label="Login form">
        {error && (
          <Alert severity="error" ref={errorRef} tabIndex={-1} sx={{ mb: 2 }}>
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
            required
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1 }} aria-hidden="true" />,
              'aria-label': 'Email address',
              'aria-required': 'true',
              'aria-invalid': Boolean(formErrors.email),
              'aria-describedby': formErrors.email ? 'email-error' : undefined,
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
            required
            autoComplete="current-password"
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
              startAdornment: (
                <PasswordIcon sx={{ mr: 1 }} aria-hidden="true" />
              ),
              'aria-label': 'Password',
              'aria-required': 'true',
              'aria-invalid': Boolean(formErrors.password),
              'aria-describedby': formErrors.password
                ? 'password-error'
                : undefined,
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
          aria-busy={loading}
        >
          {loading ? (
            <>
              <CircularProgress
                size={20}
                sx={{ mr: 1, color: 'white' }}
                aria-hidden="true"
              />
              <span>Logging in...</span>
            </>
          ) : (
            'Login'
          )}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don`t have an account?{' '}
          <Link href="/register" aria-label="Register for a new account">
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
