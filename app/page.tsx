"use client";

import { PropertyList } from "@/components";
import { useAccount, useReadContract, useWalletClient, useWriteContract } from "wagmi";
import {
  Chip,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Rubik_Burned } from "next/font/google";
import { useEffect, useState } from "react";

import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { WalletClientSigner, arbitrumSepolia } from "@alchemy/aa-core";
import { propertyAbi, propertyAddress } from "@/lib";


const rubikBurned = Rubik_Burned({
  subsets: ["latin"],
  weight: "400",
});

const chain = arbitrumSepolia;

export default function Page() {
  const [connectedAddress, setConnectedAddress] = useState<any>();
  const [useSmartWallet, setUseSmartWallet] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<any>();

  const { data: walletClient }: { data: any } = useWalletClient();

  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const readContractData = useReadContract({
    address: propertyAddress,
    abi: propertyAbi,
    functionName: "getAllProperties",
  })

  useEffect(() => {
    console.log(readContractData)
  }, [readContractData])

  useEffect(() => {
    const handleSmartWallet = async () => {
      setConnectedAddress(undefined);
      if (useSmartWallet) {
        const smartAccountClient = await createModularAccountAlchemyClient({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
          chain,
          signer: new WalletClientSigner(walletClient, "json-rpc"),
          gasManagerConfig: {
            policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
          },
        });
        setSmartAccount(smartAccountClient);
        setConnectedAddress(smartAccountClient.getAddress());
      } else {
        setConnectedAddress(address);
      }
    };
    handleSmartWallet();
  }, [address, useSmartWallet, walletClient]);

  return (
    <main className={`flex flex-col items-center justify-between gap-y-16`}>
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex flex-row items-center gap-x-4">
          Wallet Address :{" "}
          <Chip
            variant="outlined"
            color="primary"
            label={
              connectedAddress == undefined ? (
                <CircularProgress size={12} />
              ) : (
                connectedAddress
              )
            }
          />
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
        <Chip variant="outlined" color={"primary"} label={readContractData.isLoading || readContractData.isRefetching ?<CircularProgress size={12} /> :  readContractData.data+""} />
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
