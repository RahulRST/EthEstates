"use client";

import { createConfig as wagmiCreateConfig, WagmiProvider } from "wagmi";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { AlchemyClientState, createConfig } from "@alchemy/aa-alchemy/config";
import { AlchemyAccountProvider } from "@alchemy/aa-alchemy/react";

import { http } from "viem";
import {
  arbitrum,
  arbitrumSepolia as wArbitrumSepolia,
  goerli,
  mainnet,
  sepolia,
} from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { arbitrumSepolia } from "@alchemy/aa-core";

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

export const config = createConfig({
  rpcUrl: "/api/rpc", // this will proxy requests through the app's backend via NextJS routing to hide the Alchemy API key
  chain: arbitrumSepolia,
  // because we're using NextJS which is SSR, we need the following settings
  ssr: true,
  // This will allow us to persist user state to cookies, making a smoother user experience
  // not required in non SSR settings
  // storage: cookieStorage,
});

const queryClient = new QueryClient();

export const Provider = (props: PropsWithChildren<{ initialState?: AlchemyClientState }>) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVID!,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider
          config={config}
          queryClient={queryClient}
          initialState={props.initialState}
        >
          <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
        </AlchemyAccountProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
