'use client';

import { useAccount, useAuth } from '@micro-stacks/react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Bitcoin } from 'lucide-react';

export const WalletDropdown = () => {
  const { stxAddress } = useAccount();
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch balance when address changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (stxAddress) {
        try {
          const response = await fetch(`https://api.hiro.so/extended/v2/addresses/${stxAddress}/balances/stx`);
          const data = await response.json();
          setBalance(data.balance || '0');
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance('0');
        }
      }
    };

    fetchBalance();
  }, [stxAddress]);

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

  const shortAddress = stxAddress ? `${stxAddress.slice(0, 6)}...${stxAddress.slice(-4)}` : '';
  const formattedBalance = `${(Number(balance) / 1000000).toFixed(6)} STX`;

  const handleDisconnect = async () => {
    try {
      toast.loading('Disconnecting wallet...', {
        id: 'disconnecting',
      });
      await signOut();
      toast.success('Successfully disconnected from wallet', {
        id: 'disconnecting',
      });
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to disconnect from wallet', {
        id: 'disconnecting',
      });
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