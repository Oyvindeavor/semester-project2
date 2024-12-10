export const getHighestBid = (bids: { amount?: number }[]): number => {
  if (!bids || bids.length === 0) return 0;
  return Math.max(...bids.map((bid) => bid.amount || 0));
};
