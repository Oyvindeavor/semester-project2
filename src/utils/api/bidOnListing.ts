'use client';

import { ListingResponse } from '@/types/api/bidResponse';

export default async function bidOnListing(
  id: string,
  amount: number
): Promise<ListingResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/${id}/bid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      }
    );

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data: ListingResponse = await response.json();
    console.log('Bid successful:', data);
    return data;
  } catch (error) {
    console.error('Failed to bid on listing:', error);
    throw error;
  }
}
