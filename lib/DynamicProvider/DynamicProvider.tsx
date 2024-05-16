"use client";
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

import { Suspense } from "react";
import { cookieToInitialState, createConfig as wagmiCreateConfig, WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { arbitrum, arbitrumSepolia as wArbitrumSepolia, goerli, mainnet, sepolia } from "viem/chains";

import { cookieStorage, createConfig } from "@alchemy/aa-alchemy/config";
import { arbitrumSepolia } from "@alchemy/aa-core";
import { AlchemyAccountProvider } from "@alchemy/aa-alchemy/react";

export const alchemyConfig: any = createConfig({
  rpcUrl: "/api/rpc",
  chain: arbitrumSepolia,
  ssr: true,
  storage: cookieStorage,
});

export const wagmiConfig = wagmiCreateConfig({
  chains: [mainnet, goerli, wArbitrumSepolia, sepolia, arbitrum],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [wArbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

const initialState: any = cookieToInitialState(alchemyConfig);

export function DynamicProvider(
  { children }: any
) {
  return (
    <Suspense>
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVID || "",
        appName: "EthEstates",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
          <AlchemyAccountProvider
          config={alchemyConfig}
          queryClient={queryClient}
          initialState={initialState!}
        >
          {children}
        </AlchemyAccountProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
    </Suspense>
  );
}


