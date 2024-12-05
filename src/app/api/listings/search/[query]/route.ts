import { NextRequest, NextResponse } from 'next/server';
import { headers } from '../../../config/headers';
import { API_BASE } from '../../../config/endpoints';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ query: string }> }
) {
  const { query } = await context.params;
  try {
    const queryString = query.toString();

    const response = await fetch(
      `${API_BASE}auction/listings/search?q=${queryString}`,
      {
        headers: await headers(),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
      console.log('API error:', response.status);
    }

    const data = await response.json();
    console.log('Fetched auction listings:', data);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Auction listings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auction listings' },
      { status: 500 }
    );
  }
}
