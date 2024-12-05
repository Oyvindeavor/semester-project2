export interface Media {
  url: string;
  alt: string;
}

export interface Bidder {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

export interface Bid {
  id: string;
  amount: number;
  bidder: Bidder;
  created: string;
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
  bids: Bid[];
  _count: {
    bids: number;
  };
  createdFormatted: string;
  updatedFormatted: string;
  endsAtFormatted: string;
}

export interface ListingResponse {
  listing: Listing;
}
