"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const navigation: any[] = [
  // { name: "Home", href: "/" },
];

import { DynamicWidget } from "../DynamicWidget";

import Image from "next/image";
import { useAccount } from "wagmi";

export const Header = () => {

  const [connectedAddress, setConnectedAddress] = useState<`0x${string}`>();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if(!isConnected) return;
    console.log(address);
    setConnectedAddress(address);
  }, [address, isConnected]);
  return (
      <header className="inset-x-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              {/* <Image
                width={12}
                height={12}
                className="rounded-lg z-0"
                src="/next.svg"
                alt=""
              /> */}
              EthEstates
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex flex-1 lg:justify-end">
            <DynamicWidget />
          </div>
          <div className="flex flex-row gap-x-4">
            Wallet Address : {connectedAddress}
          </div>
        </nav>
      </header>
  );
}