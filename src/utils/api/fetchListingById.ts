import { Listing } from '@/types/api/FetchListingResponse';

export async function fetchListingById(id: string): Promise<Listing | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    console.error(`Failed to fetch listing with ID ${id}`);
    return null;
  }

  const jsonResponse = await response.json();
  console.log('Raw response JSON:', jsonResponse);

  return jsonResponse.listing || null;
}
