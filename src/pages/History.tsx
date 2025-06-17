import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { History as HistoryIcon, Download, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { generateMockPredictions, mockProducts } from '../services/mockData';
import LoadingSpinner from '../components/common/LoadingSpinner';

const History: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const { language } = useTranslation();

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) return;

      await new Promise(resolve => setTimeout(resolve, 800));
      const mockPredictions = generateMockPredictions(user.id);
      setPredictions(mockPredictions);
      setIsLoading(false);
    };

    loadHistory();
  }, [user]);

  const filteredPredictions = predictions.filter(pred => {
    const productMatch = !selectedProduct || pred.productId === selectedProduct;
    const dateMatch = !dateFilter || format(pred.date, 'yyyy-MM-dd') === dateFilter;
    return productMatch && dateMatch;
  });

  const handleDownloadCSV = () => {
    const csvHeaders = ['Date', 'Product', 'Predicted Quantity', 'Actual Quantity', 'Confidence', 'Accuracy'];
    const csvData = filteredPredictions.map(pred => {
      const product = mockProducts.find(p => p.id === pred.productId);
      const productName = language === 'th' ? product?.nameTh : product?.nameEn;
      const accuracy = pred.actualQuantity 
        ? Math.round((1 - Math.abs(pred.predictedQuantity - pred.actualQuantity) / pred.predictedQuantity) * 100)
        : 'N/A';
      
      return [
        format(pred.date, 'yyyy-MM-dd'),
        productName,
        pred.predictedQuantity,
        pred.actualQuantity || 'N/A',
        `${pred.confidence}%`,
        `${accuracy}%`
      ];
    });

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bakery-predictions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text={t('loading')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
              <HistoryIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('predictionHistory')}</h1>
              <p className="text-gray-600">View and analyze your past predictions</p>
            </div>
          </div>
          
          <button
            onClick={handleDownloadCSV}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>{t('downloadCSV')}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product')}
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Products</option>
              {mockProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {language === 'th' ? product.nameTh : product.nameEn}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('date')}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Predictions</h3>
          <p className="text-3xl font-bold text-purple-600">{filteredPredictions.length}</p>
          <p className="text-sm text-gray-600">In selected period</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Accuracy</h3>
          <p className="text-3xl font-bold text-green-600">
            {filteredPredictions.length > 0 
              ? Math.round(filteredPredictions.reduce((sum, pred) => sum + pred.confidence, 0) / filteredPredictions.length)
              : 0}%
          </p>
          <p className="text-sm text-gray-600">Prediction confidence</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Product</h3>
          <p className="text-lg font-bold text-blue-600">Croissant</p>
          <p className="text-sm text-gray-600">Highest accuracy rate</p>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Prediction Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('product')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('predicted')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actual')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('confidence')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPredictions.map((prediction) => {
                const product = mockProducts.find(p => p.id === prediction.productId);
                const productName = language === 'th' ? product?.nameTh : product?.nameEn;
                const accuracy = prediction.actualQuantity 
                  ? Math.round((1 - Math.abs(prediction.predictedQuantity - prediction.actualQuantity) / prediction.predictedQuantity) * 100)
                  : null;

                return (
                  <tr key={prediction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(prediction.date, 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{productName}</div>
                      <div className="text-sm text-gray-500 capitalize">{product?.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prediction.predictedQuantity} {t('pieces')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
            </tbody>
          </table>
        </div>
        
        {filteredPredictions.length === 0 && (
          <div className="text-center py-12">
            <HistoryIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No predictions found for the selected filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;