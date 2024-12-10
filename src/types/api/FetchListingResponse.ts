// Media type for images or banners
export interface Media {
  url: string;
  alt: string;
}

// Bidder type for users placing bids
export interface Bidder {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
}

// Single bid placed on the listing
export interface Bid {
  id: string;
  amount: number;
  bidder: Bidder;
  created: string;
}

// Seller details for the listing
export interface Seller {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
}

// Count information (e.g., bids)
export interface ListingCount {
  bids?: number;
}

// Main listing data type
export interface Listing {
  id: string;
  title: string;
  description: string;
  media: Media[];
  tags: string[];
  created: string;
  updated: string;
  endsAt: string;
  bids?: Bid[];
  seller?: Seller;
  _count: ListingCount;
}

// Response structure for fetching a single listing
export interface FetchListingResponse {
  data: Listing;
  meta: Record<string, unknown>;
}
