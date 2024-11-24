import { NextResponse } from 'next/server';
import { noAuthHeaders } from '@api/config/headers';
import { noroffApi } from '@api/config/endpoints';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const response = await fetch(noroffApi.register, {
      method: 'POST',
      headers: noAuthHeaders(),
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.errors?.[0]?.message || 'Failed to register';
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
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
