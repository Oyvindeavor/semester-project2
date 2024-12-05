import { noroffApi } from '@api/config/endpoints';
import { headers } from '@api/config/headers';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your NextAuth config

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.name) {
      return NextResponse.json(
        { error: 'Unauthorized: User is not logged in or name is missing' },
        { status: 401 }
      );
    }

    const name = session.user.name;
    console.log('Updating profile for user:', name);

    const { avatar, banner, bio } = await req.json();

    const response = await fetch(noroffApi.updateProfile(name), {
      method: 'PUT',
      headers: await headers(),
      body: JSON.stringify({ avatar, banner, bio }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage =
        result.errors?.[0]?.message || 'Failed to update profile';
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    console.log('Profile updated successfully:', result);
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error in profile update:', error);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
