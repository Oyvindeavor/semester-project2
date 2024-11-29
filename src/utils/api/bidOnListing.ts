'use client';

export default async function bidOnListing(
  id: string,
  amount: number,
  accessToken: string
): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/${id}/bid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ amount }),
      }
    );

    if (!response.ok) {
      console.log('Bid failed:', response);
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Bid successful:', data);
    return data;
  } catch (error) {
    console.error('Failed to bid on listing:', error);
    throw error;
  }
}
