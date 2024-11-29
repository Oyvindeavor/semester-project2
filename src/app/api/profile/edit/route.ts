import { noroffApi } from '@api/config/endpoints';
import { headers } from '@api/config/headers';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const accessToken = req.headers
      .get('Authorization')
      ?.replace('Bearer ', '');
    const name = req.headers.get('X-User-Name');
    console.log('Received Authorization Token: server', accessToken);
    console.log('Received X-User-Name: server', name);

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Authorization token is missing' },
        { status: 401 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'User name is missing' },
        { status: 400 }
      );
    }

    // Extract body data
    const { avatar, banner, bio } = await req.json();
    console.log('Received body data:', avatar, banner, bio);

    const response = await fetch(noroffApi.updateProfile(name), {
      method: 'PUT',
      headers: headers(accessToken),
      body: JSON.stringify({ avatar, banner, bio }),
    });

    console.log('Response:', response);
    const result = await response.json();

    if (!response.ok) {
      const errorMessage =
        result.errors?.[0]?.message || 'Failed to update profile';
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error in profile update:', error);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
