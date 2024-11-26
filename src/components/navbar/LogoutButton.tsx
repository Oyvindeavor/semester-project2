'use client';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/joy';

export default function LogoutButton() {
  const { logout, accessToken } = useAuth(); // Access the accessToken to determine login state
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clear accessToken and localStorage
    router.push('/'); // Redirect to the home page or login page
  };

  // Conditionally render the logout button if the user is logged in
  if (!accessToken) return null;

  return (
    <Button variant="outlined" color="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}
