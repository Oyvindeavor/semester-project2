interface EditListingData {
  title: string;
  description: string;
  media: Array<{
    url: string;
    alt: string;
  }>;
  price: number;
  tags: string[];
}

export default async function editListing(id: string, data: EditListingData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/edit/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to edit listing');
    }

    const result = await response.json();
    console.log('Listing edited successfully:', result);
    return result;
  } catch (error) {
    console.error('Error editing listing:', error);
    throw error;
  }
}
