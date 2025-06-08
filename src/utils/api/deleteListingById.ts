export async function deleteListingById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/delete/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      let errorMessage = 'Failed to delete listing';

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (err) {
        console.error('Error parsing error response:', err);
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return;
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
}
