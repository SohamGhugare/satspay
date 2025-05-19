'use client';

import { useRouter } from 'next/navigation';
import { isConnected } from '@stacks/connect';
import toast from 'react-hot-toast';
import { Bitcoin, Wallet, ShoppingCart, Lock, Clock, Laptop, Shirt, Plane, Code, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleStartWithSBTC = () => {
    if (!isConnected()) {
      toast.error('Please connect your wallet first');
      return;
    }
    router.push('/dashboard');
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStartWithSBTC}
                className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold"
              >
                Start with sBTC
              </button>
              <button 
                onClick={scrollToHowItWorks}
                className="px-6 py-3 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                How it works
              </button>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">How SatsPay Works</h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                SatsPay lets you shop online using your Bitcoin as collateral—without selling it. Here&apos;s how it works.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mb-6">
                    <Wallet className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h3>
                  <p className="text-lg leading-7 text-gray-600 mb-6">
                    Start by connecting your Bitcoin wallet to SatsPay. This allows us to verify your Bitcoin holdings and calculate your purchasing power.
                  </p>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3">What you&apos;ll need:</h4>
                    <ul className="space-y-3 text-base text-gray-600">
                      <li className="flex items-center gap-x-3">
                        <Bitcoin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <span>A bitcoin wallet</span>
                      </li>
                      <li className="flex items-center gap-x-3">
                        <Bitcoin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <span>Some sBTC in your wallet</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mb-6">
                    <ShoppingCart className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Purchase</h3>
                  <p className="text-lg leading-7 text-gray-600 mb-6">
                    Browse our marketplace for partner stores or enter details for external purchases. You can use SatsPay anywhere online.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-x-3 text-base text-gray-600">
                      <Laptop className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span>Electronics</span>
                    </div>
                    <div className="flex items-center gap-x-3 text-base text-gray-600">
                      <Shirt className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span>Fashion</span>
                    </div>
                    <div className="flex items-center gap-x-3 text-base text-gray-600">
                      <Plane className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span>Travel</span>
                    </div>
                    <div className="flex items-center gap-x-3 text-base text-gray-600">
                      <Code className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span>Software</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mb-6">
                    <Lock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Lock sBTC as Collateral</h3>
                  <p className="text-lg leading-7 text-gray-600 mb-6">
                    Lock your sBTC as collateral for your purchase. SatsPay typically requires 125% of the purchase value to protect against Bitcoin price volatility.
                  </p>
                  <div className="rounded-xl bg-orange-50 p-5 mb-6">
                    <h4 className="text-base font-semibold text-orange-900 mb-2">Example:</h4>
                    <div className="space-y-1 text-base text-orange-800">
                      <p>$500 purchase</p>
                      <p>0.009615 BTC</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600">
                    Your Bitcoin remains in your ownership via a non-custodial smart contract. If Bitcoin&apos;s value increases during your loan term, you keep all the upside!
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mb-6">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoy Your Purchase & Repay Later</h3>
                  <p className="text-lg leading-7 text-gray-600 mb-6">
                    Complete your purchase immediately. When your repayment is due (30, 60, or 90 days later), repay the loan amount plus a small fee in either Bitcoin or fiat currency.
                  </p>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3">Repayment Options:</h4>
                    <ul className="space-y-3 text-base text-gray-600">
                      <li className="flex items-center gap-x-3">
                        <Bitcoin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <span>Pay with Bitcoin directly from your wallet</span>
                      </li>
                      <li className="flex items-center gap-x-3">
                        <ArrowRight className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <span>Pay with USD or other fiat currencies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
