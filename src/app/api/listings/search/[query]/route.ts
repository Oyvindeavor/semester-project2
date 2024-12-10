import { NextRequest, NextResponse } from 'next/server';
import { headers } from '../../../config/headers';
import { API_BASE } from '../../../config/endpoints';
import { noAuthHeaders } from '../../../config/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  try {
    const queryString = query.toString();

    const response = await fetch(
      `${API_BASE}auction/listings/search?${queryString}`,
      {
        headers: noAuthHeaders(),
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
