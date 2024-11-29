/* eslint-disable */

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
  bids: number;
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
  _count: ListingCount;
}

export default function AuctionListing({ listing }: { listing: any }) {
  const {
    id,
    title,
    description,
    media,
    tags,
    created,
    updated,
    endsAt,
    bids,
    _count,
  }: Listing = listing;
}
