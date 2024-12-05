export async function deleteListingById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listing/delete/${id}`,
      {
        method: 'DELETE',
      }
    );

    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = 'Failed to delete listing';

      // Attempt to parse error message if available
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (err) {
        console.error('Error parsing error response:', err);
      }

      throw new Error(errorMessage);
    }

    // Handle 204 No Content specifically
    if (response.status === 204) {
      console.log('Listing deleted successfully');
      return; // Nothing more to do
    }

    // Handle other successful responses with content, if any
    return await response.json();
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
}
