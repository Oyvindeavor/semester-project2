export interface AuctionDetails {
  title: string;
  description?: string;
  media?: Array<{
    url: string;
    alt?: string;
  }>;
  price?: number;
  tags?: string[];
  endsAt: string;
}

export default function CreateAuction(
  auctionDetails: AuctionDetails
): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(auctionDetails),
  });
}
