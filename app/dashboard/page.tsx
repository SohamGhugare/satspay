'use client';

import { useAccount } from '@micro-stacks/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bitcoin } from 'lucide-react';
import { DashboardCard } from '../components/dashboard-card';

export default function Dashboard() {
  const { stxAddress } = useAccount();
  const router = useRouter();
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    if (!stxAddress) {
      router.push('/');
    } else {
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
  }, [stxAddress, router]);

  if (!stxAddress) {
    return null;
  }

  const stxAmount = Number(balance) / 1000000;
  const formattedBalance = `${stxAmount.toFixed(6)} sBTC`;
  const usdEquivalent = `$${(stxAmount * 0.85).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-8">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DashboardCard
            title="Your Stacks Balance"
            value={formattedBalance}
            secondaryValue={usdEquivalent}
            icon={<Bitcoin className="w-6 h-6 text-orange-400" />}
            subtext={`Available: 0.000000 sBTC
Locked: 0.000000 sBTC`}
          />
          <DashboardCard
            title="Borrowing Power"
            value="$1,000"
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