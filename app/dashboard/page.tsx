'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bitcoin, RefreshCw, ArrowRight } from 'lucide-react';
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

  // Dummy loans data
  const loans = [
    {
      title: "New Laptop",
      lockedAmount: 0.024,
      dueDate: "3/15/2025",
    },
    {
      title: "Personal Loan",
      lockedAmount: 0.002,
      dueDate: "5/10/2025",
    },
    {
      title: "Travel Loan",
      lockedAmount: 0.05,
      dueDate: "7/20/2025",
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                router.push('/purchase');
              }
            }}
            subtext="Borrow USD against Stacks"
          />
        </div>

        {/* Active Loans Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Loans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loans.map((loan, index) => {
              const loanAmount = loan.lockedAmount * btcPrice * 1.5;
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{loan.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                        Active
                      </span>
                    </div>
                    <button className="text-orange-400 hover:text-orange-500 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Loan Amount</span>
                      <span className="text-sm font-medium text-gray-900">${loanAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Locked Stacks</span>
                      <span className="text-sm font-medium text-gray-900">{loan.lockedAmount} sBTC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Due</span>
                      <span className="text-sm font-medium text-gray-900">{loan.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-bold">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 bg-orange-50 text-orange-500 border border-orange-400 rounded-lg 
                      hover:bg-orange-100 transition-all duration-300 font-bold">
                      Pay Installment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
} 