'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormLabel, Input, Button, FormHelperText } from '@mui/joy';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Alert from '@mui/joy/Alert';
import Sheet from '@mui/joy/Sheet';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      localStorage.setItem('accessToken', data.accessToken);

      router.push('/');
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
    <Card sx={{ width: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Display General Error as an Alert */}
        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {/* Email Field */}
        <Sheet>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            name="email"
            id="email"
            required
            error={Boolean(formErrors.email)}
            startDecorator={<EmailIcon />}
          />

          <FormHelperText id="email-helper-text">
            {formErrors.email}
          </FormHelperText>
        </Sheet>
        {/* Password Field */}
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          required
          error={Boolean(formErrors.password)}
          startDecorator={<PasswordIcon />}
        />
        <FormHelperText>{formErrors.password}</FormHelperText>

        {/* Submit Button */}
        <Divider />
        <Button type="submit" loading={loading} size="lg">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Card>
  );
}
