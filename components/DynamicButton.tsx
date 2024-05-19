'use client';

import {
  DynamicUserProfile,
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import { Avatar, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useClientAuth } from '@/hooks';

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

  return (
    <div className="px-6">
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
    </div>
  );
};