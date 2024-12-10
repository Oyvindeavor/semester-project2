import { NextRequest, NextResponse } from 'next/server';
import { noroffApi } from '@/app/api/config/endpoints';
import { headers } from '@/app/api/config/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, tags, media, endsAt } = body;

    if (!title || !endsAt) {
      return NextResponse.json(
        { error: 'Both "title" and "endsAt" fields are required.' },
        { status: 400 }
      );
    }

    if (media && !Array.isArray(media)) {
      return NextResponse.json(
        { error: '"media" must be an array of objects.' },
        { status: 400 }
      );
    }

    if (tags && !Array.isArray(tags)) {
      return NextResponse.json(
        { error: '"tags" must be an array of strings.' },
        { status: 400 }
      );
    }

    const response = await fetch(noroffApi.createListing, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({
        title,
        description,
        tags,
        media,
        endsAt,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Noroff API Error:', errorBody);

      return NextResponse.json(
        {
          error:
            errorBody.errors?.[0]?.message || 'Failed to create a new listing',
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Unexpected error occurred:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      },
      { status: 500 }
    );
  }
}
