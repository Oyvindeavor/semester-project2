'use client';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const { logout, accessToken } = useAuth(); // Access the accessToken to determine login state
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clear accessToken and localStorage
    router.push('/'); // Redirect to the home page or login page
  };

  // Conditionally render the logout button if the user is not logged in
  if (!accessToken) return null;

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
      sx={{
        borderColor: 'error.main',
        color: 'error.main',
        ':hover': {
          backgroundColor: 'error.light',
          borderColor: 'error.dark',
        },
      }}
    >
      Logout
    </Button>
  );
}
