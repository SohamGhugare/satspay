'use client';

import { useAuth } from '@micro-stacks/react';
import toast from 'react-hot-toast';

export const WalletConnectButton = () => {
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuth();
  const label = isRequestPending ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks wallet';
  
  const handleWalletAction = async () => {
    try {
      if (isSignedIn) {
        await signOut();
        toast.success('Disconnected from wallet');
      } else {
        await openAuthRequest();
        toast.success('Connected to wallet');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('StacksProvider')) {
        toast.error('Please install a Stacks wallet like Leather or Xverse to continue', {
          duration: 5000,
          position: 'bottom-center',
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
        });
      } else {
        toast.error('An error occurred while connecting to wallet');
      }
    }
  };

  return (
    <button
      onClick={handleWalletAction}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {label}
    </button>
  );
}; 