"use client";

import { Suspense } from "react";

import { createConfig as wagmiCreateConfig, WagmiProvider } from "wagmi";

import { http } from "viem";
import {
  arbitrum,
  arbitrumSepolia as wArbitrumSepolia,
  goerli,
  mainnet,
  sepolia,
} from "viem/chains";

import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

export const thirdWebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
  // secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY!,
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

export function Provider({ children }: any) {
  return (
    <Suspense>
      <ThirdwebProvider>
        {/* <WagmiProvider config={wagmiConfig}> */}
            {children}
        {/* </WagmiProvider> */}
      </ThirdwebProvider>
    </Suspense>
  );
}
