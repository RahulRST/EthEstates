"use client";

import { PropertyList } from "@/components";
import { useReadContract, useWriteContract } from "wagmi";
import { useActiveAccount } from "thirdweb/react";
import {
  Chip,
  CircularProgress,
} from "@mui/material";
import { Rubik_Burned } from "next/font/google";
import { useEffect, useState } from "react";

import { propertyAbi, propertyAddress } from "@/lib";


const rubikBurned = Rubik_Burned({
  subsets: ["latin"],
  weight: "400",
});


export default function Page() {
  const [connectedAddress, setConnectedAddress] = useState<any>();
  const account = useActiveAccount();

  const { writeContract } = useWriteContract();

  const readContractData = useReadContract({
    address: propertyAddress,
    abi: propertyAbi,
    functionName: "getProperty",
    args: [1715963182]
  })

  useEffect(() => {
    setConnectedAddress(account?.address ?? undefined);
  }, [account]);

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
      </div>
      <h2
        className={`text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl ${rubikBurned.className}`}
      >
        My Properties
      </h2>
      {readContractData.isLoading || readContractData.isRefetching ?<CircularProgress size={12} /> : <PropertyList properties={readContractData != undefined ? [readContractData.data] : []} />}
    </main>
  );
}
