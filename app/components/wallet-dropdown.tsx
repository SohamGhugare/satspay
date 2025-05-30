'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Bitcoin } from 'lucide-react';
import { getLocalStorage, disconnect } from '@stacks/connect';

interface TokenBalance {
  token: string;
  balance: string;
}

export const WalletDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [address, setAddress] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get address from localStorage
  useEffect(() => {
    const userData = getLocalStorage();
    if (userData?.addresses?.stx?.[0]?.address) {
      setAddress(userData.addresses.stx[0].address);
    }
  }, []);

  // Fetch balance when address changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const response = await fetch(`https://api.testnet.hiro.so/extended/v2/addresses/${address}/balances/ft`);
          const data = await response.json();
          const sbtcToken = data.results.find((token: TokenBalance) => token.token.includes('sbtc-token'));
          setBalance(sbtcToken?.balance || '0');
        } catch (error) {
          console.error('Error fetching sBTC balance:', error);
          setBalance('0');
        }
      }
    };

    fetchBalance();
  }, [address]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const formattedBalance = `${(Number(balance) / 100000000).toFixed(2)} sBTC`;

  const handleDisconnect = async () => {
    try {
      toast.loading('Disconnecting wallet...', {
        id: 'disconnecting',
      });
      disconnect();
      toast.success('Successfully disconnected from wallet', {
        id: 'disconnecting',
      });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to disconnect from wallet', {
        id: 'disconnecting',
      });
      console.error('Failed to disconnect from wallet:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white text-orange-400 border border-orange-400 rounded-lg hover:bg-orange-50 transition-colors font-medium"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="font-semibold">Connected</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Status</p>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="text-sm font-medium text-gray-900">Connected</p>
            </div>
          </div>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Network</p>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <p className="text-sm font-medium text-gray-900">Testnet</p>
            </div>
          </div>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Balance</p>
            <div className="flex items-center space-x-2">
              <Bitcoin className="w-4 h-4 text-orange-400" />
              <p className="text-sm font-mono text-gray-900">{formattedBalance}</p>
            </div>
          </div>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-sm font-mono text-gray-900">{shortAddress}</p>
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}; 