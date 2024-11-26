'use client';
import { Avatar } from '@mui/joy';
import { useAuth } from '@/context';

export default function AvatarNavBar() {
  const { accessToken } = useAuth();

  // Fetch the user data from localStorage if accessToken is present
  const user = accessToken
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;

  // Extract avatar URL and provide a fallback
  const imageUrl =
    user?.avatar?.url ||
    'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318';
  const altText = user?.avatar?.alt || 'User Avatar';

  return (
    <Avatar size="lg" sx={{ objectFit: 'contain' }}>
      <img
        src={imageUrl}
        srcSet={`${imageUrl}&dpr=2 2x`}
        loading="lazy"
        alt={altText}
      />
    </Avatar>
  );
}
