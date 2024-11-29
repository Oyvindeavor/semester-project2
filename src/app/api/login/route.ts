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
    console.log('Login successful:', result.data);
    console.log('Login successful:', result);

    if (!response.ok) {
      const errorMessage = result.errors?.[0]?.message || 'Failed to login';
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const user = result.data;
    const accessToken = result.data.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'AccessToken is missing in the response.' },
        { status: 400 }
      );
    }

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
