'use client';

import { WalletConnectButton } from './wallet-connect-button';
import { Bitcoin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from '@micro-stacks/react';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { stxAddress } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!stxAddress) {
      e.preventDefault();
      toast.error('Please connect to a wallet');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'border-b border-gray-200' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="w-6 h-6 text-orange-400" />
            <span className="text-xl text-black font-bold tracking-tighter">SatsPay</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard"
              onClick={handleDashboardClick}
              className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Dashboard
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}; 