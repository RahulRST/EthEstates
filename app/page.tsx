"use client";

import { PropertyList } from "@/components";
import { useAccount, useWalletClient } from "wagmi";
import { Chip, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { Rubik_Burned } from "next/font/google";
import { useEffect, useState } from "react";

import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { WalletClientSigner, arbitrumSepolia } from "@alchemy/aa-core";

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

  const makeTransaction = async () => {
    const { hash: uoHash } = await smartAccount.sendUserOperation({
      uo: {
        target: "0x95F137cd4B044B3aa6BfCA414D3202597502f7Ec", // The desired target contract address
        data: "0x95F137cd4B044B3aa6BfCA414D3202597502f7Ec", // (Optional) data to send to the target contract address
        value: BigInt(0), // (Optional) value to send the target contract address
      },
    });
    
    console.log(uoHash); // Log the user operation hash
    
    // Wait for the user operation to be mined
    const txHash = await smartAccount.waitForUserOperationTransaction({ hash: uoHash });
    
    console.log(txHash);
  }

  return (
    <main className={`flex flex-col items-center justify-between gap-y-16`}>
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex flex-row items-center gap-x-4">
          Wallet Address :{" "}
            <Chip variant="outlined" color="primary" label={connectedAddress == undefined ? <CircularProgress size={12} /> : connectedAddress} />
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
        <button onClick={makeTransaction}>Make Transaction</button>
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
