'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchProfileById from '@/utils/api/fetchProfile';
import { useAuth } from '@/context/useAuth';
import { User } from '@/context/useAuth';

export default function Profile() {
  const { accessToken, user, loading } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!accessToken || !user?.name) {
    router.push('/login');
  }

  useEffect(() => {
    if (loading || profile) return;

    const fetchProfile = async () => {
      try {
        if (!accessToken || !user?.name) {
          throw new Error('User not authenticated or missing name');
        }

        const profileData = await fetchProfileById(user.name, accessToken);
        setProfile(profileData);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchProfile();
  }, [loading, accessToken, user?.name, profile]);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{profile?.name}s Profile</h1>
      <p>Email: {profile?.email}</p>
      <p>Bio: {profile?.bio || 'No bio available'}</p>
      <p>Credits: {profile?.credits}</p>
      <p>Listings: {profile?.listings.length}</p>
      <p>Wins: {profile?.wins.length}</p>
      <img src={profile?.avatar.url} alt={profile?.avatar.alt} />
    </div>
  );
}
