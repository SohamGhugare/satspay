'use client';

import { useAuth, useAccount } from '@micro-stacks/react';
import { WalletDropdown } from './wallet-dropdown';
import { Bitcoin } from 'lucide-react';
import toast from 'react-hot-toast';

export const WalletConnectButton = () => {
  const { openAuthRequest } = useAuth();
  const { stxAddress } = useAccount();

  const handleConnect = async () => {
    try {
      toast.loading('Connecting wallet...', {
        id: 'connecting',
      });
      await openAuthRequest();
      toast.success('Successfully connected to wallet', {
        id: 'connecting',
      });
    } catch (error) {
      toast.error('Failed to connect to wallet', {
        id: 'connecting',
      });
      console.log('Failed to connect to wallet: ', error);
    }
  };

  if (stxAddress) {
    return <WalletDropdown />;
  }

  return (
    <button
      onClick={handleConnect}
      className="inline-flex items-center px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold"
    >
      <Bitcoin className="w-4 h-4 mr-2" />
      Connect Wallet
    </button>
  );
}; 