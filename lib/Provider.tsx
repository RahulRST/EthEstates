"use client";

import { createConfig as wagmiCreateConfig, WagmiProvider } from "wagmi";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

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

export const Provider = ({ children } : { children: any }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVID!,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
