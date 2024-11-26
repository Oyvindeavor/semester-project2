import { NextResponse } from 'next/server';
import { noroffApi } from '@api/config/endpoints';
import { headers } from '@api/config/headers';

export async function GET(
  req: Request,
  props: { params: Promise<{ name: string }> }
) {
  const params = await props.params;
  try {
    // Access the dynamic parameter `name`
    const { name } = params;

    // Fetch profile data with necessary headers
    const response = await fetch(noroffApi.getSingleProfile(name), {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      console.log(response.status, response);
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json({ profile: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}
