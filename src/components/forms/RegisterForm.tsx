'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TextField,
  Button,
  Card,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error || success || Object.keys(formErrors).length > 0) {
      errorRef.current?.focus();
    }
  }, [error, success, formErrors]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setFormErrors({});
    setError(null);
    setSuccess(null);

    const errors: { name?: string; email?: string; password?: string } = {};
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      errors.name = 'Name is required.';
    } else if (!nameRegex.test(name)) {
      errors.name =
        'Please enter a valid name (letters, numbers, and underscores only).';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register.');
      }

      setSuccess('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      component="main"
      role="main"
      aria-labelledby="register-title"
      sx={{ margin: '0 auto', padding: 3 }}
    >
      <form onSubmit={handleSubmit} noValidate aria-label="Registration form">
        {error && (
          <Alert severity="error" ref={errorRef} tabIndex={-1} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" ref={errorRef} tabIndex={-1} sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Username"
            name="name"
            type="text"
            placeholder="Username"
            fullWidth
            required
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1 }} aria-hidden="true" />,
              'aria-label': 'Username',
              'aria-required': 'true',
              'aria-invalid': Boolean(formErrors.name),
              'aria-describedby': formErrors.name ? 'name-error' : undefined,
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
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
            name="password"
            type="password"
            placeholder="Password"
            fullWidth
            required
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
          variant="outlined"
          color="primary"
          fullWidth
          disabled={loading}
          aria-busy={loading}
          sx={{ color: 'white', mt: 2 }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} aria-hidden="true" />
              <span>Registering...</span>
            </>
          ) : (
            'Register'
          )}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: 'white' }}
        >
          Already have an account?{' '}
          <Box
            component={Link}
            href="/auth/signin"
            aria-label="Login to your account"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Login
          </Box>
        </Typography>
      </form>
    </Card>
  );
}
