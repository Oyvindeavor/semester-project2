import { NextResponse, NextRequest } from 'next/server';
import { noAuthHeaders } from '../../config/headers';
import { API_BASE } from '../../config/endpoints';

export async function GET(
  request: NextRequest,
  context: { params: { query: string } }
) {
  const { query } = await context.params;

  try {
    const queryString = query.toString();
    console.log('Fetching auction listings with query:', queryString);
    const response = await fetch(`${API_BASE}auction/listings?${queryString}`, {
      headers: noAuthHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

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