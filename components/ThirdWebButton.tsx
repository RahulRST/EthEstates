"use client"
import {
    ConnectButton,
  } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
  import {
    createWallet,
    walletConnect,
    inAppWallet,
  } from "thirdweb/wallets";
  
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
  });
  
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
    createWallet("me.rainbow"),
  ];
  
  export function ThirdWebButton() {
    return (
        <ConnectButton
          client={client}
          // wallets={wallets}
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