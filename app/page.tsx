"use client";

import { PropertyList } from "@/components";
import { useAccount } from "wagmi";
import {
  SafeAccountV0_2_0 as SafeAccount,
} from "abstractionkit";
import { Chip, FormControlLabel, Switch } from "@mui/material";
import { Rubik_Burned } from "next/font/google";
import { useEffect, useState } from "react";
import { getAddress } from "viem";

const rubikBurned = Rubik_Burned({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  const [connectedAddress, setConnectedAddress] = useState<`0x${string}`>();
  const [useSmartWallet, setUseSmartWallet] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<SafeAccount>();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setConnectedAddress(undefined);
    if (!isConnected) return;
    if (!useSmartWallet) {
      setConnectedAddress(address);
    } else if (useSmartWallet && address) {
      const newSmartAccount = SafeAccount.initializeNewAccount([address]);
      setSmartAccount(newSmartAccount);
      setConnectedAddress(getAddress(newSmartAccount.accountAddress));
    }
  }, [address, isConnected, useSmartWallet]);


  return (
    <main className={`flex flex-col items-center justify-between gap-y-16`}>
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex flex-row items-center gap-x-4">
          Wallet Address :{" "}
          <Chip variant="outlined" color="primary" label={connectedAddress} />
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={useSmartWallet}
              color="info"
              onChange={() => setUseSmartWallet(!useSmartWallet)}
            />
          }
          label="Use Smart Wallet"
        />
      </div>
      <h2
        className={`text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl ${rubikBurned.className}`}
      >
        My Properties
      </h2>
      <PropertyList />
    </main>
  );
}
