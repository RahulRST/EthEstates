"use client";

import { createConfig as wagmiCreateConfig, WagmiProvider } from "wagmi";

import { http } from "viem";
import {
  arbitrum,
  arbitrumSepolia,
  goerli,
  mainnet,
  sepolia,
} from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const wagmiConfig = wagmiCreateConfig({
  chains: [mainnet, goerli, arbitrumSepolia, sepolia, arbitrum],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [arbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Provider({ children }: any) {
  return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
  );
}
