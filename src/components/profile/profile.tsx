'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context';

interface Profile {
  name: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

export default function Profile({ name }: { name: string }) {
  const { accessToken } = useAuth(); // Use the accessToken from the context
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setError('Invalid profile name');
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const response = await fetch(`/api/profile/${name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken || ''}`, // Include the token in the headers
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile data');
        }

        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchProfile(); // Fetch only if the accessToken is available
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [name, accessToken]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading profile: {error}</p>
        <button onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${profile?.banner?.url})`,
          backgroundSize: 'cover',
          height: '200px',
          width: '100%',
        }}
        aria-label={profile?.banner?.alt}
      ></div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginTop: '-50px' }}
      >
        <img
          src={profile?.avatar?.url}
          alt={profile?.avatar?.alt || 'User avatar'}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '5px solid white',
          }}
        />
        <h1 style={{ marginLeft: '20px' }}>{profile?.name}</h1>
      </div>
      <p>Email: {profile?.email}</p>
      <p>Venue Manager: {profile?.venueManager ? 'Yes' : 'No'}</p>
    </div>
  );
}
