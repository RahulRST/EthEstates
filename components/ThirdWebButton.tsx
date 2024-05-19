"use client";
import { ConnectButton } from "thirdweb/react";
import { arbitrumSepolia } from "thirdweb/chains";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { thirdWebClient } from "@/lib";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("me.rainbow"),
];

export function ThirdWebButton() {
  return (
    <ConnectButton
      client={thirdWebClient}
      wallets={wallets}
      accountAbstraction={{
        chain: arbitrumSepolia,
        sponsorGas: true,
      }}
      theme={"dark"}
      connectModal={{
        size: "wide",
        title: "EthEstates",
        showThirdwebBranding: false,
      }}
    />
  );
}
