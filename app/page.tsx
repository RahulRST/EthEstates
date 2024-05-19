"use client"
import { PropertyList } from "@/components";
import { useReadContract, TransactionButton } from "thirdweb/react";
import { useEffect } from "react";

import {
  CircularProgress,
} from "@mui/material";
import { Rubik_Burned } from "next/font/google";

import { propertyAbi, propertyAddress, thirdWebClient } from "@/lib";
import { getContract } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";

const rubikBurned = Rubik_Burned({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {

  const propertyContract = getContract({
    address: propertyAddress,
    client: thirdWebClient,
    chain: arbitrumSepolia,
  });

  const readContractData = useReadContract({
    contract: propertyContract,
    method: "function getAllProperties() public view returns (PropertyStruct[] memory)",
  })

  useEffect(() => {
    console.log(readContractData);
  }, [readContractData]);

  useEffect(() => {
    
  })

  // const readContractData = useReadContract({
  //   address: propertyAddress,
  //   abi: propertyAbi,
  //   functionName: "getAllProperties",
  // })

  return (
    <main className={`flex flex-col items-center justify-between gap-y-16`}>
      <h2
        className={`text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl ${rubikBurned.className}`}
      >
        My Properties
      </h2>
      {readContractData.isLoading || readContractData.isRefetching ?<CircularProgress /> : <PropertyList properties={readContractData.data != undefined ? readContractData.data : []} />}
    </main>
  );
}
