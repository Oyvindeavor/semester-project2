// Main configuration file for the API endpoints/URLs and environment variables.

// Environment variables
const NEXT_PUBLIC_API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE = NEXT_PUBLIC_API_BASE;
const API_KEY = process.env.API_KEY;

export { API_BASE, API_KEY };

export function validateEnvVars() {
  if (!NEXT_PUBLIC_API_BASE || !API_KEY) {
    console.error('Environment variables API_BASE or API_KEY are not defined');
    throw new Error(
      'Environment variables API_BASE or API_KEY are not defined'
    );
  }
}

export const noroffApi = {
  // Auth
  login: `${API_BASE}auth/login`,
  register: `${API_BASE}auth/register`,

  // Auction
  getAllListings: (query: string) => `${API_BASE}auction/listings?${query}`,
  searchListings: (query: string) =>
    `${API_BASE}auction/listings/search?q=${query}`,
  getSingleListing: (id: string) =>
    `${API_BASE}auction/listings/${id}?_seller=true&_bids=true`,

  createListing: `${API_BASE}auction/listings`,

  bidOnListing: (id: string) => `${API_BASE}auction/listings/${id}/bids`,
  updateListing: (id: string) => `${API_BASE}auction/listings/${id}`,
  deleteListing: (id: string) => `${API_BASE}auction/listings/${id}`,

  // Profiles
  getAllProfiles: `${API_BASE}auction/profiles`,
  getSingleProfile: (name: string) =>
    `${API_BASE}auction/profiles/${name}?_listings=true&_wins=true`,
  getAllListingsByProfile: (name: string) =>
    `${API_BASE}auction/profiles/${name}/listings`,
  getAllBidsByProfile: (name: string) =>
    `${API_BASE}auction/profiles/${name}/bids`,
  getAllWinsByProfile: (name: string) =>
    `${API_BASE}auction/profiles/${name}/wins`,
  searchProfiles: (query: string) =>
    `${API_BASE}auction/profiles/search?q=${query}`,
  updateProfile: (name: string) => `${API_BASE}auction/profiles/${name}`,
};
