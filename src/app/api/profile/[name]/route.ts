import { NextResponse } from 'next/server';
import { noroffApi } from '@api/config/endpoints';
import { headers } from '@api/config/headers';

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;

    // Example: Fetch the token from the request or session
    const accessToken = req.headers
      .get('Authorization')
      ?.replace('Bearer ', '');

    // Fetch profile data with necessary headers
    const response = await fetch(noroffApi.getSingleProfile(name), {
      method: 'GET',
      headers: headers(accessToken || null), // Pass the token to the headers function
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
    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}
