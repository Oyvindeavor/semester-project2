import { NextResponse } from 'next/server';
import { noroffApi } from '../../../config/endpoints';
import { headers } from '../../../config/headers';

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { title, description, tags, imageUrl, imageAlt } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    const requestBody = {
      ...(title && { title }),
      ...(description && { description }),
      ...(tags && { tags }),
      ...(imageUrl &&
        imageAlt && {
          media: [{ url: imageUrl, alt: imageAlt }],
        }),
    };

    const response = await fetch(noroffApi.updateListing(id), {
      method: 'PUT',
      headers: await headers(),
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Noroff API Error:', errorData);
      return NextResponse.json(
        { error: errorData.error || 'Failed to update listing' },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in PUT /api/edit:', error);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
