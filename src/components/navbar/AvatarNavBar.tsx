'use client';
import { Avatar } from '@mui/joy';
import { useAuth } from '@/context/index';

export default function AvatarNavBar() {
  const { accessToken, user } = useAuth(); // Access user and accessToken from context

  if (!accessToken || !user) {
    return null; // Render nothing if the user is not logged in
  }

  // Extract avatar URL and provide a fallback
  const imageUrl =
    user.avatar?.url ||
    'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318';
  const altText = user.avatar?.alt || 'User Avatar';

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
