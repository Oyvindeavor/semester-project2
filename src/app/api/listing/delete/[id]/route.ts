import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your NextAuth config
import { noroffApi } from '@/app/api/config/endpoints';
import { headers } from '@/app/api/config/headers';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Listing ID is required' },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = session.accessToken;

    const response = await fetch(`${noroffApi.deleteListing(id)}`, {
      method: 'DELETE',
      headers: await headers(accessToken),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Noroff API:', errorData);

      return NextResponse.json(
        {
          error: errorData.message || 'Failed to delete listing',
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Listing deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error deleting listing:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
