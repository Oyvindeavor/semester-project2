import { NextResponse, NextRequest } from 'next/server';
import { noroffApi } from '@api/config/endpoints';
import { noAuthHeaders } from '@api/config/headers';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ listing: null });
  }

  try {
    const response = await fetch(noroffApi.getSingleListing(id), {
      method: 'GET',
      headers: noAuthHeaders(),
    });

    const rawData = await response.json();

    if (!response.ok) {
      return NextResponse.json({ listing: null });
    }

    const data = rawData.data;
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ listing: null });
    }

    const listing = {
      ...data,
      createdFormatted: new Date(data.created).toLocaleString(),
      updatedFormatted: new Date(data.updated).toLocaleString(),
      endsAtFormatted: new Date(data.endsAt).toLocaleString(),
      bids: data.bids.sort(
        (a: { amount: number }, b: { amount: number }) => b.amount - a.amount
      ),
    };

    return NextResponse.json({ listing });
  } catch (error) {
    console.error('Unexpected error fetching listing:', error);
    return NextResponse.json({ listing: null });
  }
}
