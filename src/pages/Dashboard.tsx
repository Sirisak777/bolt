import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, DollarSign, Target, BarChart3, Croissant, PieChart as PieIcon, LineChart as LineIcon, Quote } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateMockSalesData, generateMockPredictions } from '../services/mockData';
import StatCard from '../components/common/StatCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CrumbRain from '../contexts/CrumbRain';


const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [predictionData, setPredictionData] = useState<any[]>([]);

  const breadTypeData = [
    { type: 'Croissant', value: 200 },
    { type: 'Milk Bun', value: 150 },
    { type: 'Cheese Roll', value: 100 },
  ];
  const COLORS = ['#fcd34d', '#fb923c', '#f87171']; // pastel yellow-orange-red

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockSales = generateMockSalesData(user.id);
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const chartData = last7Days.map(date => {
        const daysSales = mockSales.filter(sale => sale.date.toISOString().split('T')[0] === date);
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
  <div className="relative space-y-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen p-6 font-prompt transition-colors duration-300">
    <CrumbRain />

  {/* Welcome Header */}
 <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-md border border-yellow-200 dark:border-slate-700">
  <div className="flex items-center gap-3 text-orange-600 dark:text-orange-300 mb-2">
    <Croissant className="w-8 h-8 animate-bounce-soft" />
    <h1 className="text-3xl font-bold">{t('welcome')} {user?.shopName}!</h1>
  </div>
  <p className="text-gray-600 dark:text-slate-300">Here's your bakery performance overview for today</p>
</div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title={t('totalSales')} value="₿3,420" icon={DollarSign} trend={{ value: 12.5, isPositive: true }} gradient="bg-gradient-to-br from-green-400 to-emerald-500" />
        <StatCard title={t('predictions')} value="8" icon={Target} trend={{ value: 8.2, isPositive: true }} gradient="bg-gradient-to-br from-blue-400 to-indigo-500" />
        <StatCard title={t('accuracy')} value="89.2%" icon={BarChart3} trend={{ value: 3.1, isPositive: true }} gradient="bg-gradient-to-br from-purple-400 to-pink-500" />
        <StatCard title={t('growth')} value="+15.3%" icon={TrendingUp} trend={{ value: 5.7, isPositive: true }} gradient="bg-gradient-to-br from-orange-400 to-red-400" />
        <StatCard title="Suggested Breads Today" value="650" icon={Target} trend={{ value: 4.3, isPositive: true }} gradient="bg-gradient-to-br from-yellow-300 to-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Weekly Sales Revenue */}
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow border border-yellow-100 dark:border-slate-700">
     <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300 mb-4 flex items-center gap-2">
      <BarChart3 className="w-5 h-5" />
      {t('weeklySalesRevenue') || 'Weekly Sales Revenue'}
    </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fcd34d" />
            <XAxis dataKey="date" stroke="#fb923c" />
            <YAxis stroke="#fb923c" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                color: '#facc15',
                border: '1px solid #fbbf24',
                borderRadius: 8
              }}
            />
            <Bar dataKey="revenue" fill="url(#salesGradient)" radius={4} />
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
{/* Prediction vs Actual */}
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow border border-yellow-100 dark:border-slate-700">
     <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300 mb-4 flex items-center gap-2">
      <LineIcon className="w-5 h-5" />
      {t('predictionVsActual') || 'Prediction vs Actual Sales'}
    </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fcd34d" />
            <XAxis dataKey="name" stroke="#fb923c" />
            <YAxis stroke="#fb923c" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                color: '#facc15',
                border: '1px solid #fbbf24',
                borderRadius: 8
              }}
            />
            <Line type="monotone" dataKey="predicted" stroke="#60a5fa" strokeWidth={3} dot={{ fill: '#60a5fa', r: 4 }} name="Predicted" />
            <Line type="monotone" dataKey="actual" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', r: 4 }} name="Actual" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
      
       {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-orange-300 dark:border-orange-500 rounded-xl hover:border-orange-400 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-200 text-center group">
            <div className="text-orange-500 group-hover:text-orange-600 mb-2">
              <Target className="h-8 w-8 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">Make New Prediction</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Forecast tomorrow's sales</p>
          </button>

          <button className="p-4 border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-xl hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 text-center group">
            <div className="text-blue-500 group-hover:text-blue-600 mb-2">
              <BarChart3 className="h-8 w-8 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">View Analytics</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Detailed sales analysis</p>
          </button>

          <button className="p-4 border-2 border-dashed border-green-300 dark:border-green-500 rounded-xl hover:border-green-400 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-slate-700 transition-all duration-200 text-center group">
            <div className="text-green-500 group-hover:text-green-600 mb-2">
              <DollarSign className="h-8 w-8 mx-auto" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white">Export Data</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Download sales reports</p>
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 italic mt-10 flex items-center justify-center gap-2">
        “A warm loaf a day keeps the stress away.”
      </div>


    </div>
  );
};

export default Dashboard;