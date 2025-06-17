import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Target, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateMockSalesData, generateMockPredictions } from '../services/mockData';
import StatCard from '../components/common/StatCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [predictionData, setPredictionData] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockSales = generateMockSalesData(user.id);
      const mockPredictions = generateMockPredictions(user.id);

      // Process data for charts
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const chartData = last7Days.map(date => {
        const daysSales = mockSales.filter(sale => 
          sale.date.toISOString().split('T')[0] === date
        );
        const totalRevenue = daysSales.reduce((sum, sale) => sum + sale.revenue, 0);
        const totalQuantity = daysSales.reduce((sum, sale) => sum + sale.quantity, 0);

        return {
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: totalRevenue,
          quantity: totalQuantity,
        };
      });

      setSalesData(chartData);
      setPredictionData([
        { name: 'Mon', predicted: 450, actual: 420 },
        { name: 'Tue', predicted: 380, actual: 395 },
        { name: 'Wed', predicted: 520, actual: 510 },
        { name: 'Thu', predicted: 480, actual: 465 },
        { name: 'Fri', predicted: 620, actual: 640 },
        { name: 'Sat', predicted: 780, actual: 750 },
        { name: 'Sun', predicted: 680, actual: 695 },
      ]);

      setIsLoading(false);
    };

    loadDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text={t('loading')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('welcome')} {user?.shopName}! 🥐
        </h1>
        <p className="text-gray-600">
          Here's your bakery performance overview for today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalSales')}
          value="₿3,420"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title={t('predictions')}
          value="8"
          icon={Target}
          trend={{ value: 8.2, isPositive: true }}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <StatCard
          title={t('accuracy')}
          value="89.2%"
          icon={BarChart3}
          trend={{ value: 3.1, isPositive: true }}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        <StatCard
          title={t('growth')}
          value="+15.3%"
          icon={TrendingUp}
          trend={{ value: 5.7, isPositive: true }}
          gradient="bg-gradient-to-br from-orange-500 to-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sales Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="revenue" fill="url(#salesGradient)" radius={4} />
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prediction Accuracy Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction vs Actual Sales</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Predicted"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-center group">
            <div className="text-orange-500 group-hover:text-orange-600 mb-2">
              <Target className="h-8 w-8 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900">Make New Prediction</h4>
            <p className="text-sm text-gray-600">Forecast tomorrow's sales</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-center group">
            <div className="text-blue-500 group-hover:text-blue-600 mb-2">
              <BarChart3 className="h-8 w-8 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900">View Analytics</h4>
            <p className="text-sm text-gray-600">Detailed sales analysis</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-green-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-center group">
            <div className="text-green-500 group-hover:text-green-600 mb-2">
              <DollarSign className="h-8 w-8 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900">Export Data</h4>
            <p className="text-sm text-gray-600">Download sales reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;