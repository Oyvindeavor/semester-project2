import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { noroffApi } from '@api/config/endpoints';
import { headers } from '@api/config/headers';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.name) {
      return NextResponse.json(
        { error: 'User is not authenticated or name is missing' },
        { status: 401 }
      );
    }

    const name = session.user.name;
    console.log('Authenticated user name:', name);

    const response = await fetch(noroffApi.getSingleProfile(name), {
      method: 'GET',
      headers: await headers(),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('API Error Response:', errorBody);

      return NextResponse.json(
        { error: errorBody.errors?.[0]?.message || 'Profile not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Fetched profile data:', data);
    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}
