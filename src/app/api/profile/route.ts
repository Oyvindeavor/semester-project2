import { NextResponse } from 'next/server';
import { noroffApi } from '@api/config/endpoints';
import { headers } from '@api/config/headers';

export async function GET(req: Request) {
  try {
    const accessToken = req.headers
      .get('Authorization')
      ?.replace('Bearer ', '');
    const name = req.headers.get('X-User-Name');

    console.log('Received Authorization Token:', accessToken);
    console.log('Received X-User-Name:', name);

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

    const response = await fetch(noroffApi.getSingleProfile(name), {
      method: 'GET',
      headers: headers(accessToken),
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
