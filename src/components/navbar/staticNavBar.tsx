// StaticNavBar.tsx (Server-Side Rendered Component)
import Link from 'next/link';
import Box from '@mui/material/Box';

export default function StaticNavBar() {
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
        <Link href="/login" style={{ marginRight: '1rem' }}>
          Login
        </Link>
        <Link href="/register">Register</Link>
      </div>
    </Box>
  );
}
