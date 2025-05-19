'use client';

import { Navbar } from './components/navbar';
import { Bitcoin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center min-h-[70vh] justify-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-400 rounded-full text-sm font-semibold">
              <Bitcoin className="w-4 h-4 mr-2" />
              Powered by sBTC
            </span>
          </div>
          <div className="space-y-2 mb-12">
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tighter">
              Buy Anything. <span className="text-orange-400">Pay Later.</span>
            </h1>
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tighter">
              Keep Your Bitcoin.
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mb-12 leading-relaxed">
            SatsPay lets you shop online using your Bitcoin as collateral—without selling it. Get instant approval, flexible repayment terms, and keep your sats stacking.
          </p>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold">
              <Bitcoin className="w-5 h-5 mr-2" />
              Start with sBTC
            </button>
            <button className="px-6 py-3 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              How it works
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
