'use client';

import Box from '@mui/joy/Box';
import AvatarNavBar from './AvatarNavBar';
import LogoutButton from './LogoutButton';
import { useAuth } from '@/context/useAuth';
import StaticNavBar from './staticNavBar';
import Link from 'next/link';

export default function NavBar() {
  const { loggedIn } = useAuth(); // Use loggedIn from useAuth for conditional rendering

  if (!loggedIn) {
    // StaticNavBar when not logged in (faster loading server rendered)
    return <StaticNavBar />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: 'background.level1',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Link href="/">Home</Link>
      <div>
        <Link href="/profile" style={{ marginRight: '1rem' }}>
          Profile
        </Link>
        <LogoutButton />
        <AvatarNavBar />
      </div>
    </Box>
  );
}
