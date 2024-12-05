export default async function searchListings(query: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings/search/${query}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }
    const data = await response.json();
    console.log('Fetched listings:', data);
    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}
