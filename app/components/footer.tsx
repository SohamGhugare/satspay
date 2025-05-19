'use client';

import { Bitcoin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full py-6 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <span>© 2025</span>
          <Bitcoin className="w-4 h-4 text-orange-400" />
          <span>SatsPay. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}; 