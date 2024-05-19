"use client"

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Chip, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const AccountManager = () => {
  const { primaryWallet } = useDynamicContext();
  const [ useSmartAccount, setUseSmartAccount ] = useState(false);
  const [ smartAccount, setSmartAccount ] = useState<any>();
  const [ connectedAddress, setConnectedAddress ] = useState<`0x${string}` | undefined>(undefined);
  const { address } = useAccount();

  useEffect(() => {
    setConnectedAddress(undefined)
    if (useSmartAccount) {
      setConnectedAddress("0xSmartAccount")
    } else {
      setConnectedAddress(address!);
    }
  }, [useSmartAccount, address, primaryWallet?.connector]);

  return (
    <div>
      <div className="flex flex-row gap-x-5">
        Connected Address: <Chip variant="outlined" color="primary" label={connectedAddress == undefined ? <CircularProgress size={12} /> : connectedAddress}></Chip>
        <Button variant="outlined" onClick={() => setUseSmartAccount(!useSmartAccount)}>
          {useSmartAccount ? "Use Wallet Account" : "Use Smart Account"}
        </Button>
      </div>
    </div>
  );
};
