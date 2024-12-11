'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Bid } from '@/types/api/listing';

interface BidsContextType {
  addBid: (bid: Bid) => void;
  bids: Bid[];
  updateBids: (bids: Bid[]) => void;
}

const BidsContext = createContext<BidsContextType | undefined>(undefined);

export const BidsProvider = ({
  children,
  initialBids,
}: {
  children: React.ReactNode;
  initialBids: Bid[];
}) => {
  const [bids, setBids] = useState<Bid[]>(initialBids);

  const addBid = useCallback((newBid: Bid) => {
    setBids((prevBids) => [newBid, ...prevBids]);
  }, []);

  const updateBids = useCallback((newBids: Bid[]) => {
    setBids(newBids);
  }, []);

  return (
    <BidsContext.Provider value={{ bids, addBid, updateBids }}>
      {children}
    </BidsContext.Provider>
  );
};

export const useBids = () => {
  const context = useContext(BidsContext);
  if (!context) throw new Error('useBids must be used within a BidsProvider');
  return context;
};
