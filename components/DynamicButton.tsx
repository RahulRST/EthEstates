'use client';

import {
  DynamicUserProfile,
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import { Avatar, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useClientAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { propertyAbi, propertyAddress } from '@/lib';
import { useReadContract, useWriteContract } from 'wagmi';

const styles = {
  avatar: {
    border: '2px solid #ffffffaa',
    cursor: 'pointer',
    width: 44,
    height: 44,
    '&:hover': {
      borderColor: '#fff'
    }
  }
};

export const DynamicButton = () => {
  const { isAuthenticated } = useClientAuth();
  const { setShowDynamicUserProfile, setShowAuthFlow, primaryWallet } =
    useDynamicContext();
  const { address } = primaryWallet || {};

  const [isOwner, setIsOwner] = useState(false);

  const { writeContract } = useWriteContract();

  const readOwner = useReadContract({
    abi: propertyAbi,
    address: propertyAddress,
    functionName: "owner"
  })

  const readBalance = useReadContract({
    abi: propertyAbi,
    address: propertyAddress,
    functionName: "getBalance",
  });

  const handleWithdraw = () => {
    writeContract({
      address: propertyAddress,
      abi: propertyAbi,
      functionName: "withdraw",
    });
  };

  useEffect(() => {
    if (readOwner.data && readBalance.data) {
      setIsOwner(readOwner.data === address && (Number.parseFloat(readBalance.data.toString()) > 0));
    }
  }, [readOwner.data, address, readBalance.data]);

  return (
    <div className="px-6 flex flex-row gap-x-4">
      {isAuthenticated ? (
        <Avatar
          onClick={() => setShowDynamicUserProfile(true)}
          src={`https://noun-api.com/beta/pfp?name=${address}`}
          sx={styles.avatar}
        />
      ) : (
        <Button
          onClick={() => setShowAuthFlow(true)}
          variant='outlined'
          color='primary'
          endIcon={<LockOutlined />}
        >
          Login
        </Button>
      )}
      <DynamicUserProfile variant='modal' />
      {isOwner && (
        <Button
          onClick={handleWithdraw}
          variant='outlined'
          color='primary'
        >
          Withdraw
        </Button>
      )}
    </div>
  );
};