'use client';

import { useAuth } from '@micro-stacks/react';
import toast from 'react-hot-toast';
import { WalletDropdown } from './wallet-dropdown';
import { Bitcoin } from 'lucide-react';

export const WalletConnectButton = () => {
  const { openAuthRequest, isRequestPending, isSignedIn } = useAuth();
  
  if (isSignedIn) {
    return <WalletDropdown />;
  }

  return (
    <button
      onClick={async () => {
        try {
          if (isRequestPending) {
            toast.loading('Connecting to wallet...', {
              id: 'connecting',
            });
          }
          await openAuthRequest();
          toast.success('Successfully connected to wallet', {
            id: 'connecting',
          });
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
      }}
      className="flex items-center space-x-2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium"
    >
      <Bitcoin className="w-4 h-4" />
      <span className="font-semibold text-sm">{isRequestPending ? 'Loading...' : 'Connect Wallet'}</span>
    </button>
  );
}; 