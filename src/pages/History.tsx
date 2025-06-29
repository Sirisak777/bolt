import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Download, Filter, Calendar, History as HistoryIcon } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

interface Prediction {
  id: string;
  date: string;
  menuName: string;
  predictedQuantity: number;
  confidence: number; 
  productId?: string;
  actualQuantity?: number | null;
}

const History: React.FC = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const stored = localStorage.getItem(`predictions_history_${user.id}`);
    if (stored) {
      const parsed: Prediction[] = JSON.parse(stored).map((p: any) => ({
        ...p,
        predictedQuantity: Number(p.predictedQuantity),
        confidence: Number(p.confidence),
      }));
      setPredictions(parsed);
    }
    setLoading(false);
  }, [user]);

  const filtered = predictions.filter(item => {
    const matchProduct = !selectedProduct || item.menuName === selectedProduct;
    const matchDate = !selectedDate || format(new Date(item.date), 'yyyy-MM-dd') === selectedDate;
    return matchProduct && matchDate;
  });

  const downloadCSV = () => {
    const headers = ['Date', 'Product', 'Predicted Quantity'];
    const rows = filtered.map(item => [
      format(new Date(item.date), 'yyyy-MM-dd'),
      item.menuName,
      item.predictedQuantity.toString(),
    ]);

    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bakery_predictions_${format(new Date(), 'yyyyMMdd')}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      {/* Header */}
=======
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
              <HistoryIcon className="h-6 w-6 text-white" />
            </div>
            <div>
<<<<<<< HEAD
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prediction History</h1>
              <p className="text-gray-600 dark:text-slate-300">View and analyze your past predictions</p>
            </div>
          </div>
          <button 
            onClick={downloadCSV}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2"
          >
=======
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('predictionHistory')}</h1>
              <p className="text-gray-600 dark:text-slate-300">View and analyze your past predictions</p>
            </div>
          </div>
          <button onClick={handleDownloadCSV} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2">
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
            <Download className="h-4 w-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>


      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="h-5 w-5 text-gray-600 dark:text-white" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Product</label>
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
=======
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">
              {t('product')}
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
            >
              <option value="">All Products</option>
              {[...new Set(predictions.map(item => item.menuName))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Date</label>
=======
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">
              {t('date')}
            </label>
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
<<<<<<< HEAD
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
=======
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<<<<<<< HEAD
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">Total Predictions</h3>
          <p className="text-3xl font-bold text-purple-600">{filtered.length}</p>
          <p className="text-sm text-gray-600 dark:text-slate-300">In selected filters</p>
        </div>
      </div>

      {/* Table */}
=======
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">Total Predictions</h3>
          <p className="text-3xl font-bold text-purple-600">{filteredPredictions.length}</p>
          <p className="text-sm text-gray-600 dark:text-slate-300">In selected period</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">Average Accuracy</h3>
          <p className="text-3xl font-bold text-green-600">
            {filteredPredictions.length > 0 
              ? Math.round(filteredPredictions.reduce((sum, pred) => sum + pred.confidence, 0) / filteredPredictions.length)
              : 0}%
          </p>
          <p className="text-sm text-gray-600 dark:text-slate-300">Prediction confidence</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">Best Product</h3>
          <p className="text-lg font-bold text-blue-600">Croissant</p>
          <p className="text-sm text-gray-600 dark:text-slate-300">Highest accuracy rate</p>
        </div>
      </div>

      {/* Predictions Table */}
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden dark:bg-slate-800 dark:border-none">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Prediction Records</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
<<<<<<< HEAD
            <thead className="bg-gray-50 dark:bg-slate-800">
=======
            <thead className="bg-gray-50 dark:bg-slate-800 ">
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Qty</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-slate-700">
<<<<<<< HEAD
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500">
                    No data found for the selected filters.
                  </td>
                </tr>
              )}
              {filtered.map(item => (
                <tr key={`${item.id}-${item.date}`} className="hover:bg-gray-50 transition-colors dark:hover:bg-slate-600">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{format(new Date(item.date), 'yyyy-MM-dd')}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.menuName}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 dark:text-white">{item.predictedQuantity}</td>
                </tr>
              ))}
=======
              {filteredPredictions.map((prediction) => {
                const product = mockProducts.find(p => p.id === prediction.productId);
                const productName = language === 'th' ? product?.nameTh : product?.nameEn;
                const accuracy = prediction.actualQuantity 
                  ? Math.round((1 - Math.abs(prediction.predictedQuantity - prediction.actualQuantity) / prediction.predictedQuantity) * 100)
                  : null;

                return (
                  <tr key={prediction.id} className="hover:bg-gray-50 transition-colors dark:hover:bg-slate-600">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {format(prediction.date, 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{productName}</div>
                      <div className="text-sm text-gray-500 capitalize">{product?.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-300">
                      {prediction.predictedQuantity} {t('pieces')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-300">
                      {prediction.actualQuantity ? `${prediction.actualQuantity} ${t('pieces')}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        prediction.confidence >= 90
                          ? 'bg-green-100 text-green-800'
                          : prediction.confidence >= 80
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {prediction.confidence}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {accuracy !== null ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          accuracy >= 90
                            ? 'bg-green-100 text-green-800'
                            : accuracy >= 80
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {accuracy}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
>>>>>>> 4acf3ef5136556ffd4c52ae0d7708726fceaae7f
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
