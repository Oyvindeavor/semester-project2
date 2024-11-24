import { NextResponse } from 'next/server';
import { noAuthHeaders } from '../../../api/headers';
import { noroffApi } from '../../../api/config';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(noroffApi.login, {
      method: 'POST',
      headers: noAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Extract the first error message from the server response
      const errorMessage = result.errors?.[0]?.message || 'Failed to login';
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const accessToken = result.data?.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { error: 'AccessToken is missing in the response.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ accessToken, ...result.data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
