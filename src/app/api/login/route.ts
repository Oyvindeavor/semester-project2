import { NextResponse } from 'next/server';
import { noAuthHeaders } from '@api/config/headers';
import { noroffApi } from '@api/config/endpoints';

export async function POST(req: Request) {
  try {
    const { email: userEmail, password } = await req.json();

    const response = await fetch(noroffApi.login, {
      method: 'POST',
      headers: noAuthHeaders(),
      body: JSON.stringify({ email: userEmail, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.errors?.[0]?.message || 'Failed to login';
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Extract necessary fields from the response
    const { accessToken, name, email, avatar, banner, venueManager } =
      result.data;

    // Validate that accessToken is present
    if (!accessToken) {
      return NextResponse.json(
        { error: 'AccessToken is missing in the response.' },
        { status: 400 }
      );
    }

    // Structure the user data to return to the client
    const user = { name, email, avatar, banner, venueManager };

    // Return the accessToken and user
    return NextResponse.json({ accessToken, user });
  } catch (error) {
    // Handle unexpected errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Unexpected error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
