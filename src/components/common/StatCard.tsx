import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, gradient }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;