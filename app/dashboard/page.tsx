'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bitcoin, RefreshCw } from 'lucide-react';
import { DashboardCard } from '../components/dashboard-card';
import { isConnected, getLocalStorage } from '@stacks/connect';

export default function Dashboard() {
  const router = useRouter();
  const [balance, setBalance] = useState<string>('0');
  const [stxAddress, setStxAddress] = useState<string | null>(null);
  const [isSBTC, setIsSBTC] = useState(true);

  useEffect(() => {
    if (!isConnected()) {
      router.push('/');
    } else {
      const userData = getLocalStorage();
      if (userData?.addresses?.stx?.[0]?.address) {
        setStxAddress(userData.addresses.stx[0].address);
      }
      
    }
  }, [router]);

  useEffect(() => {
    if (stxAddress) {
      // Fetch balance
      const fetchBalance = async () => {
        try {
          const response = await fetch(`https://api.testnet.hiro.so/extended/v1/address/${stxAddress}/stx`);
          const data = await response.json();
          setBalance(data.balance || '0');
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance('0');
        }
      };
      fetchBalance();
    }
  }, [stxAddress]);

  if (!stxAddress) {
    return null;
  }

  const stxAmount = Number(balance) / 1000000;
  const stxLockedAmount = (stxAmount * 0.2).toFixed(2);
  const stxAvailableAmount = (stxAmount * 0.8).toFixed(2);

  // STX values
  const stxFormattedBalance = `${stxAmount.toFixed(2)} STX`;
  const stxUsdEquivalent = stxAmount * 0.85;
  const stxUsdFormatted = `$${stxUsdEquivalent.toFixed(2)}`;

  // sBTC values (dummy data)
  const sbtcAmount = 0.2; // Dummy sBTC amount
  const btcPrice = 65000; // Current BTC price in USD
  const sbtcLockedAmount = (sbtcAmount * 0.2).toFixed(2);
  const sbtcAvailableAmount = (sbtcAmount * 0.8).toFixed(2);
  const sbtcFormattedBalance = `${sbtcAmount.toFixed(2)} sBTC`;
  const sbtcUsdEquivalent = sbtcAmount * btcPrice;
  const sbtcUsdFormatted = `$${sbtcUsdEquivalent.toFixed(2)}`;

  // Calculate borrowing power based on current USD equivalent
  const currentUsdEquivalent = isSBTC ? sbtcUsdEquivalent : stxUsdEquivalent;
  const borrowingPower = currentUsdEquivalent / 1.5;
  const borrowingPowerFormatted = `$${borrowingPower.toFixed(2)}`;

  const handleToggle = () => {
    setIsSBTC(!isSBTC);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DashboardCard
            title={
              <div className="flex items-center justify-center gap-2">
                <span>Your Stacks Balance</span>
                <button
                  onClick={handleToggle}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Toggle between STX and sBTC"
                >
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            }
            value={isSBTC ? sbtcFormattedBalance : stxFormattedBalance}
            secondaryValue={isSBTC ? sbtcUsdFormatted : stxUsdFormatted}
            icon={<Bitcoin className="w-6 h-6 text-orange-400" />}
            subtext={`Available: ${isSBTC ? sbtcAvailableAmount : stxAvailableAmount} ${isSBTC ? 'sBTC' : 'STX'}
Locked: ${isSBTC ? sbtcLockedAmount : stxLockedAmount} ${isSBTC ? 'sBTC' : 'STX'}`}
          />
          <DashboardCard
            title="Borrowing Power"
            value={borrowingPowerFormatted}
            badge={{
              text: "80% LTV",
              color: "bg-orange-50 text-orange-400"
            }}
            subtext="Based on your available Stacks balance"
          />
          <DashboardCard
            title="Loan"
            button={{
              text: "+ Start New Purchase",
              onClick: () => {
                // Handle new purchase
                console.log('Start new purchase');
              }
            }}
            subtext="Borrow USD against Stacks"
          />
        </div>
      </main>
    </div>
  );
} 