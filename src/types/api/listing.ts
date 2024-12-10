// Types for auction single listing

export interface Media {
  url: string;
  alt: string;
}

export interface Bidder {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
}

export interface Bid {
  id: string;
  amount: number;
  bidder: Bidder;
  created: string;
}

export interface ListingCount {
  bids?: number;
}

export interface Seller {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
}

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
  _count: ListingCount;
  seller?: Seller;
  bidder?: Bidder;
}
