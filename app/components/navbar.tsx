'use client';

import { WalletConnectButton } from './wallet-connect-button';
import { Bitcoin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'border-b border-gray-200' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="w-6 h-6 text-orange-400" />
            <span className="text-xl text-black font-bold tracking-tighter">SatsPay</span>
          </Link>
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  );
}; 