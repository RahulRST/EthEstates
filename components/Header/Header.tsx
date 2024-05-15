"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const navigation: any[] = [
  // { name: "Home", href: "/" },
];

import { DynamicWidget } from "../DynamicWidget";

import Image from "next/image";
import { useAccount, useChainId } from "wagmi";
import { SafeAccountV0_2_0 as SafeAccount } from "abstractionkit";
import { Chip, FormControlLabel, Switch, ToggleButton } from "@mui/material";

export const Header = () => {
  const [connectedAddress, setConnectedAddress] = useState<`0x${string}`>();
  const [useSmartWallet, setUseSmartWallet] = useState<boolean>(false);
  const [smartInitCode, setSmartInitCode] = useState<string>("");
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    setConnectedAddress(undefined);
    if (!isConnected) return;
    if (!useSmartWallet) {
      setConnectedAddress(address);
    } else if (useSmartWallet && address) {
      let [accountAddress, initCode] =
        SafeAccount.createAccountAddressAndInitCode([address]);
      setConnectedAddress(accountAddress as `0x${string}`);
      setSmartInitCode(initCode);
    }
  }, [address, isConnected, useSmartWallet, chainId]);
  return (
    <header className="inset-x-0 z-50">
      <nav
        className="mx-auto flex flex-col gap-y-3 max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-row items-center gap-x-4">
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
        </div>
        <div className="flex flex-row items-center gap-x-4">
          <div className="flex flex-row items-center gap-x-4">
            Wallet Address : <Chip variant="outlined" color="primary" label={connectedAddress} />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={useSmartWallet}
                onChange={() => setUseSmartWallet(!useSmartWallet)}
              />
            }
            label="Use Smart Wallet"
          />
        </div>
      </nav>
    </header>
  );
};
