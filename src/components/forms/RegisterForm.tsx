'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, FormHelperText, Card } from '@mui/joy';
import EmailIcon from '@mui/icons-material/Email';
import PassWordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import Alert from '@mui/joy/Alert';
import FormLabel from '@mui/joy/FormLabel';
import Link from 'next/link';

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
    <Card sx={{ margin: '0 auto', width: '400px' }}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Display General Error as an Alert */}
        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {/* Username field */}
        <FormLabel>Username</FormLabel>
        <Input
          name="name"
          type="name"
          startDecorator={<PersonIcon />}
          placeholder="Username"
          required
          error={Boolean(formErrors.name)}
        />
        <FormHelperText id="name-helper-text" color="danger">
          {formErrors.name}
        </FormHelperText>
        {/* Email field */}
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          name="email"
          type="email"
          startDecorator={<EmailIcon />}
          placeholder="Email"
          required
          error={Boolean(formErrors.email)}
        />
        <FormHelperText id="email-helper-text" color="danger">
          {formErrors.email}
        </FormHelperText>
        {/* Password field */}
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          name="password"
          type="password"
          startDecorator={<PassWordIcon />}
          placeholder="Password"
          required
          error={Boolean(formErrors.password)}
        />
        <FormHelperText id="password-helper-text" color="danger">
          {formErrors.password}
        </FormHelperText>
        <Button
          type="submit"
          variant="solid"
          color="primary"
          fullWidth
          size="lg"
          loading={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <FormHelperText>
          Already have an account?{' '}
          <Link href="/login" passHref>
            login
          </Link>
        </FormHelperText>
      </form>
    </Card>
  );
}
