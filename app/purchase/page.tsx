'use client';

import { useState } from 'react';
import { ArrowRight, Bitcoin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PurchaseForm {
  amount: string;
  purpose: string;
  term: number;
  collateral: number;
}

export default function PurchasePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<PurchaseForm>({
    amount: '',
    purpose: '',
    term: 30,
    collateral: 0,
  });

  const calculateCollateral = (amount: number) => {
    const btcPrice = 65000; // Current BTC price
    const collateralRatio = 1.5; // 150% collateral ratio
    return (amount * collateralRatio) / btcPrice;
  };

  const calculateTotalRepay = (amount: number) => {
    const interestRate = 0.02; // 2% interest rate
    return amount * (1 + interestRate);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setFormData({
      ...formData,
      amount: e.target.value,
      collateral: calculateCollateral(amount),
    });
  };

  const handleTermChange = (term: number) => {
    setFormData({
      ...formData,
      term,
      collateral: calculateCollateral(parseFloat(formData.amount) || 0),
    });
  };

  const getDueDate = (term: number) => {
    const date = new Date();
    date.setDate(date.getDate() + term);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
            New Loan Application
          </h1>
          <p className="text-gray-600">
            Use your Bitcoin as collateral to make a purchase now and pay later.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">
              {currentStep === 1 ? 'Purchase Details' : currentStep === 2 ? 'Repayment Terms' : 'Lock Collateral'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* Step 1: Purchase Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Purchase Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Amount ($)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-900 placeholder-gray-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Purpose
                </label>
                <input
                  type="text"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-900 placeholder-gray-500"
                  placeholder="e.g., New laptop"
                />
              </div>
            </div>
          )}

          {/* Step 2: Repayment Terms */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Repayment Terms</h3>
                <p className="text-gray-600 mb-6">
                  Choose how long you need to repay your loan. Longer terms require more collateral.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[30, 60, 90].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTermChange(term)}
                      className={`p-4 rounded-xl border ${
                        formData.term === term
                          ? 'border-orange-400 bg-orange-50 text-orange-400'
                          : 'border-gray-200 hover:border-orange-200 text-gray-900'
                      }`}
                    >
                      <div className="text-2xl font-bold">{term}</div>
                      <div className="text-sm">days</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchase Amount</span>
                    <span className="font-medium text-gray-900">${formData.amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Term Length</span>
                    <span className="font-medium text-gray-900">{formData.term} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium text-gray-900">2%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Total to Repay</span>
                    <span className="font-medium text-gray-900">
                      ${calculateTotalRepay(parseFloat(formData.amount) || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lock Collateral */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lock sBTC Collateral</h3>
                <p className="text-gray-600 mb-6">
                  Review your loan details and lock your sBTC as collateral
                </p>
                <div className="bg-orange-50 border border-orange-400 rounded-xl p-6">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-gray-900 text-lg">Required Collateral</span>
                    <span className="flex items-center space-x-2 font-bold text-gray-900 text-xl">
                      <Bitcoin className="w-6 h-6 text-orange-400" />
                      <span>{formData.collateral.toFixed(6)}</span>
                      <span>sBTC</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchase Purpose</span>
                    <span className="font-medium text-gray-900">{formData.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchase Amount</span>
                    <span className="font-medium text-gray-900">${formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Repayment Term</span>
                    <span className="font-medium text-gray-900">{formData.term} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collateral Required</span>
                    <span className="font-medium text-gray-900">{formData.collateral.toFixed(6)} sBTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-medium text-gray-900">{getDueDate(formData.term)}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                By continuing, you agree to lock {formData.collateral.toFixed(6)} sBTC as collateral for this loan. 
                Your Bitcoin will be returned when you repay your loan.
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900"
                disabled={isProcessing}
              >
                Back
              </button>
            )}
            <button
              onClick={async () => {
                if (currentStep < 3) {
                  setCurrentStep(currentStep + 1);
                } else {
                  setIsProcessing(true);
                  // Simulate processing time
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  toast.success('Loan Successful');
                  router.push('/dashboard');
                }
              }}
              disabled={isProcessing}
              className={`px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg 
                hover:from-orange-500 hover:to-orange-600 transition-all duration-300 font-semibold
                shadow-[0_4px_12px_-2px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_16px_-2px_rgba(249,115,22,0.4)]
                hover:-translate-y-0.5 ml-auto disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {currentStep === 3 ? (
                isProcessing ? (
                  <>
                    Processing
                    <Loader2 className="w-4 h-4 inline-block ml-2 animate-spin" />
                  </>
                ) : (
                  <>
                    Confirm & Lock Collateral
                    <ArrowRight className="w-4 h-4 inline-block ml-2" />
                  </>
                )
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 