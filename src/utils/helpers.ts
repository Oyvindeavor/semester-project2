import { NoroffApiError } from '@/types/api/noroffError';

export function extractErrorMessage(error: NoroffApiError): string {
  if (error.errors && error.errors.length > 0) {
    return error.errors[0].message; // Use the first error message
  }
  return 'An unknown error occurred.';
}
