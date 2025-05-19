'use client';

import { WalletConnectButton } from './wallet-connect-button';
import { Bitcoin } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Bitcoin className="w-6 h-6 text-orange-400" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">SatsPay</span>
            </Link>
          </div>
          <div className="flex items-center">
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}; 