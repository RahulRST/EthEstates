"use client"

import { getDefaultLightAccountFactoryAddress } from "@alchemy/aa-accounts";
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { WalletClientSigner, arbitrumSepolia, type SmartAccountSigner } from "@alchemy/aa-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Chip, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// a smart account signer you can use as an owner on ISmartContractAccount

export const AccountManager = () => {
  const { primaryWallet } = useDynamicContext();
  const [ useLightAccount, setUseLightAccount ] = useState(false);
  const [ lightAccount, setLightAccount ] = useState<any>();
  const [ connectedAddress, setConnectedAddress ] = useState<`0x${string}` | undefined>(undefined);
  const { address } = useAccount();

  useEffect(() => {
    setConnectedAddress(undefined)
    if (useLightAccount) {
      const getLightAccount = async () => {
        const dynamicProvider: any = await primaryWallet?.connector?.getWalletClient();
        const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
          dynamicProvider,
          "dynamic" // signer type
        );
        const lightAccountClient = await createLightAccountAlchemyClient({
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
            chain: arbitrumSepolia,
            signer: dynamicSigner,
            useSimulation: true,
            factoryAddress: getDefaultLightAccountFactoryAddress(arbitrumSepolia),
            version: "v2.0.0"
          });
        setLightAccount(lightAccountClient);
        console.log(lightAccountClient)
        setConnectedAddress(lightAccountClient.getAddress());
      };
        getLightAccount();
    } else {
      setConnectedAddress(address!);
    }
  }, [useLightAccount, address, primaryWallet?.connector]);

  return (
    <div>
      <div className="flex flex-row gap-x-5">
        Connected Address: <Chip variant="outlined" color="primary" label={connectedAddress == undefined ? <CircularProgress size={12} /> : connectedAddress}></Chip>
        <Button variant="outlined" onClick={() => setUseLightAccount(!useLightAccount)}>
          {useLightAccount ? "Use Wallet Account" : "Use Light Account"}
        </Button>
      </div>
    </div>
  );
};
"use client"

import { getDefaultLightAccountFactoryAddress } from "@alchemy/aa-accounts";
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { WalletClientSigner, arbitrumSepolia, type SmartAccountSigner } from "@alchemy/aa-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button, Chip, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// a smart account signer you can use as an owner on ISmartContractAccount

export const AccountManager = () => {
  const { primaryWallet } = useDynamicContext();
  const [ useLightAccount, setUseLightAccount ] = useState(false);
  const [ lightAccount, setLightAccount ] = useState<any>();
  const [ connectedAddress, setConnectedAddress ] = useState<`0x${string}` | undefined>(undefined);
  const { address } = useAccount();

  useEffect(() => {
    setConnectedAddress(undefined)
    if (useLightAccount) {
      const getLightAccount = async () => {
        const dynamicProvider: any = await primaryWallet?.connector.getWalletClient();
        const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
          dynamicProvider,
          "dynamic"
        );
        const lightAccountClient = await createLightAccountAlchemyClient({
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
            chain: arbitrumSepolia,
            signer: dynamicSigner,
            useSimulation: true,
            factoryAddress: getDefaultLightAccountFactoryAddress(arbitrumSepolia),
            version: "v2.0.0"
          });
        setLightAccount(lightAccountClient);
        console.log(lightAccountClient)
        setConnectedAddress(lightAccountClient.getAddress());
      };
        getLightAccount();
    } else {
      setConnectedAddress(address!);
    }
  }, [useLightAccount, address, primaryWallet?.connector]);

  return (
    <div>
      <div className="flex flex-row gap-x-5">
        Connected Address: <Chip variant="outlined" color="primary" label={connectedAddress == undefined ? <CircularProgress size={12} /> : connectedAddress}></Chip>
        <Button variant="outlined" onClick={() => setUseLightAccount(!useLightAccount)}>
          {useLightAccount ? "Use Wallet Account" : "Use Light Account"}
        </Button>
      </div>
    </div>
  );
};
