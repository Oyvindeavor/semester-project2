import Link from 'next/link';
import Box from '@mui/joy/Box';
import AvatarNavBar from './AvatarNavBar';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  return (
    <div>
      <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
        <Link href={'/'}>Home</Link>
        <LogoutButton />

        <AvatarNavBar />
      </Box>
    </div>
  );
}
