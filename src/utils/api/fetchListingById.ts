import { Listing } from '@/types/api/listing';

export async function fetchListingById(id: string): Promise<Listing | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/${id}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    console.error(`Failed to fetch listing with ID ${id}`);
    return null;
  }

  const jsonResponse = await response.json();

  return jsonResponse.listing || null;
}
