// import { NextResponse, NextRequest } from 'next/server';
// import { noAuthHeaders } from '../../config/headers';
// import { API_BASE } from '../../config/endpoints';
// import { NoroffApiError } from '@/types/api/noroffError';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ query: string }> }
// ) {
//   const query = (await params).query;

//   try {
//     const queryString = query.toString();
//     console.log('Fetching auction listings with query:', queryString);
//     const response = await fetch(
//       `${API_BASE}auction/listings?${queryString}&_active=true&seller_true&_bids=true`,
//       {
//         headers: noAuthHeaders(),
//         cache: 'no-cache',
//       }
//     );

//     if (!response.ok) {
//       console.log(response);
//       throw new Error(`API error: ${response.status}`);
//     }

//     const data = await response.json();

//     return NextResponse.json(data, {
//       status: 200,
//       headers: {
//         'Cache-Control': 'no-store',
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Auction listings error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch auction listings' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from 'next/server';
import { noAuthHeaders } from '../../config/headers';
import { API_BASE } from '../../config/endpoints';
import { NoroffApiError } from '@/types/api/noroffError';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;

  try {
    const queryString = query.toString();
    console.log('Fetching auction listings with query:', queryString);
    const response = await fetch(
      `${API_BASE}auction/listings?${queryString}&_active=true&seller_true&_bids=true`,
      {
        headers: noAuthHeaders(),
        cache: 'no-cache',
      }
    );

    if (!response.ok) {
      console.log(response);
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
