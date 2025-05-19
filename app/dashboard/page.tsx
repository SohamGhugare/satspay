'use client';

import { useAccount } from '@micro-stacks/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { stxAddress } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!stxAddress) {
      router.push('/');
    }
  }, [stxAddress, router]);

  if (!stxAddress) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-4 text-gray-600">Welcome to your SatsPay dashboard!</p>
      </main>
    </div>
  );
} 