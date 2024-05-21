"use client"

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const useClientAuth = () => {
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isAuthenticated: isClient && isConnected,
    address
  };
};