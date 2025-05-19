'use client';

import { Bitcoin } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value?: string;
  secondaryValue?: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
  button?: {
    text: string;
    onClick: () => void;
  };
  subtext?: string;
}

export const DashboardCard = ({ title, value, secondaryValue, icon, badge, button, subtext }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.2)] transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">{title}</h2>
      {button ? (
        <div className="flex flex-col items-center">
          <button
            onClick={button.onClick}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold"
          >
            {button.text}
          </button>
          {subtext && (
            <p className="text-sm text-gray-500 mt-4 text-center">{subtext}</p>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {icon}
              {value && <span className="text-xl font-semibold text-gray-600">{value}</span>}
            </div>
            <div className="flex items-center space-x-3">
              {secondaryValue && (
                <span className="text-xl font-semibold text-gray-600">{secondaryValue}</span>
              )}
              {badge && (
                <span className={`px-4 py-1.5 ${badge.color} rounded-full text-sm font-semibold`}>
                  {badge.text}
                </span>
              )}
            </div>
          </div>
          {subtext && (
            <p className="text-sm text-gray-500 mt-4 text-center whitespace-pre-line">{subtext}</p>
          )}
        </>
      )}
    </div>
  );
}; 