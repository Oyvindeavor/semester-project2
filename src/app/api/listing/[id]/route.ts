import { NextResponse } from 'next/server';
import { noroffApi } from '@api/config/endpoints';
import { noAuthHeaders } from '@api/config/headers';
import { FetchListingResponse } from '@/types/api/FetchListingResponse';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  console.log('Fetching listing with ID:', id);

  if (!id) {
    console.log('Missing ID in request');
    return NextResponse.json({ listing: null });
  }

  try {
    const response = await fetch(noroffApi.getSingleListing(id), {
      method: 'GET',
      headers: noAuthHeaders(),
    });

    console.log('External API response status:', response.status);

    const rawData = await response.json();
    console.log('Raw data from Noroff API:', rawData);

    if (!response.ok) {
      console.log('Error from Noroff API:', rawData);
      return NextResponse.json({ listing: null });
    }

    const data = rawData.data;
    if (!data || Object.keys(data).length === 0) {
      console.log('Empty or invalid data returned from Noroff API');
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

    console.log('Formatted listing:', listing);
    return NextResponse.json({ listing });
  } catch (error) {
    console.error('Unexpected error fetching listing:', error);
    return NextResponse.json({ listing: null });
  }
}
