"use client"
import { AccountManager, PropertyList } from "@/components";
import { useReadContract } from "wagmi";
import { useEffect } from "react";

import {
  CircularProgress,
} from "@mui/material";
import { Rubik_Burned } from "next/font/google";

import { propertyAbi, propertyAddress } from "@/lib";

const rubikBurned = Rubik_Burned({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {

  const readContractData = useReadContract({
    abi: propertyAbi,
    address: propertyAddress,
    functionName: "getAllProperties"
  })

  useEffect(() => {
    console.log(readContractData);
  }, [readContractData]);

  return (
    <main className={`flex flex-col items-center justify-between gap-y-16`}>
      {/* <AccountManager /> */}
      <h2
        className={`text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl ${rubikBurned.className}`}
      >
        My Properties
      </h2>
      {readContractData.isLoading || readContractData.isRefetching ?<CircularProgress /> : <PropertyList properties={readContractData.data != undefined ? readContractData.data : []} />}
    </main>
  );
}
