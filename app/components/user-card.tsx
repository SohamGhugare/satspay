'use client';

import { useAccount, useAuth } from '@micro-stacks/react';
import { useEffect } from 'react';

export const UserCard = () => {
  const { stxAddress } = useAccount();
  const { isSignedIn } = useAuth();
  
  useEffect(() => {
    console.log('Connection state:', { isSignedIn, stxAddress });
  }, [isSignedIn, stxAddress]);
  
  if (!isSignedIn || !stxAddress) return null;
  
  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Connected Wallet</h2>
      <p className="font-mono text-sm break-all">{stxAddress}</p>
    </div>
  );
}; 