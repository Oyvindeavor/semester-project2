'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Card,
  Box,
  Typography,
  Alert,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Reset error states
    setFormErrors({});
    setError(null);

    // Validate form fields
    const errors: { name?: string; email?: string; password?: string } = {};

    // Name validation
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    if (!name) {
      errors.name = 'Name is required.';
    } else if (!nameRegex.test(name)) {
      errors.name = 'Please enter a valid name.';
    }

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
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register.');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      router.push('/login?success=Registration successful');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ margin: '0 auto', width: '400px', padding: 3 }}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Display General Error as an Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Username field */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Username"
            name="name"
            type="text"
            placeholder="Username"
            fullWidth
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        {/* Email field */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            fullWidth
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        {/* Password field */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            fullWidth
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
              startAdornment: <PasswordIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
