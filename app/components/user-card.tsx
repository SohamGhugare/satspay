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
    <div className="mt-4 p-6 bg-white border border-orange-200 rounded-lg shadow-sm">
      <h2 className="text-sm font-medium text-orange-500 mb-2">Connected Wallet</h2>
      <p className="font-mono text-sm break-all text-gray-700">{stxAddress}</p>
    </div>
  );
}; 