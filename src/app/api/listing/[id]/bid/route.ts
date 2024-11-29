import { NextRequest, NextResponse } from 'next/server';
import { noroffApi } from '@/app/api/config/endpoints';
import { headers } from '@/app/api/config/headers';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
  console.log('Received Authorization Token:', accessToken);
  console.log(id);

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Authorization token is missing' },
      { status: 401 }
    );
  }

  const { amount } = await req.json();

  if (!id || !amount) {
    return NextResponse.json(
      { error: 'Listing ID and bid amount are required.' },
      { status: 400 }
    );
  }
  console.log('Processing bid:', { id, amount });

  try {
    console.log('Processing bid:', { id, amount });

    const response = await fetch(noroffApi.bidOnListing(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers(accessToken),
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Noroff API Error:', errorBody);
      return NextResponse.json(
        {
          error:
            errorBody.errors?.[0]?.message ||
            'Failed to place bid on Noroff API.',
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log('Noroff API Bid Success:', responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error processing bid:', error);
    return NextResponse.json(
      { error: 'Failed to process bid. Please try again later.' },
      { status: 500 }
    );
  }
}
