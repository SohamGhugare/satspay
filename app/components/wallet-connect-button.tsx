'use client';

import { useState } from 'react';
import { connect, disconnect, isConnected } from '@stacks/connect';
import toast from 'react-hot-toast';
import { WalletDropdown } from './wallet-dropdown';

export const WalletConnectButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      toast.success('Wallet disconnected successfully!');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet. Please try again.');
    }
  };

  const isWalletConnected = isConnected();

  if (isWalletConnected) {
    return <WalletDropdown />;
  }

  return (
    <button
      onClick={isWalletConnected ? handleDisconnect : handleConnect}
      disabled={isConnecting}
      className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? 'Connecting...' : isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  );
}; 