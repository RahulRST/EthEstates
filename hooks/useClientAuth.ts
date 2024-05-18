"use client"

import { useEffect, useState } from 'react';
import { useActiveWalletConnectionStatus } from "thirdweb/react";

export const useClientAuth = () => {
  const [isClient, setIsClient] = useState(false);
  const status = useActiveWalletConnectionStatus();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isAuthenticated: isClient && status == "connected",
  };
};