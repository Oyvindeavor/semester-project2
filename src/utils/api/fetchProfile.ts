import { UserData } from '@/types/api/FetchProfile';

export default async function fetchProfileById(
  name: string,
  token: string
): Promise<UserData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-User-Name': name,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error Response Body:', errorBody);

    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  const jsonResponse = await response.json();
  console.log('Received profile data:', jsonResponse);

  // Extract `data` from `profile`
  if (!jsonResponse.profile || !jsonResponse.profile.data) {
    throw new Error('Profile data is missing in the response');
  }

  return jsonResponse.profile.data; // Return the `data` field from the `profile`
}
