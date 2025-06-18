import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Target, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BREAD_OPTIONS = [
  '12 MACARON', 'ARMORICAIN', 'ARTICLE 295', 'BAGUETTE', 'BAGUETTE APERO', 'BAGUETTE GRAINE', 'BANETTE', 
  'BANETTINE', 'BOISSON 33CL', 'BOTTEREAU', 'BOULE 200G', 'BOULE 400G', 'BOULE POLKA', 'BRIOCHE', 
  'BRIOCHE DE NOEL', 'BRIOCHETTE', 'BROWNIES', 'BUCHE 4PERS', 'BUCHE 6PERS', 'BUCHE 8PERS', 'CAFE OU EAU', 
  'CAKE', 'CAMPAGNE', 'CARAMEL NOIX', 'CEREAL BAGUETTE', 'CHAUSSON AUX POMMES', 'CHOCOLAT', 'CHOU CHANTILLY', 
  'COMPLET', 'COOKIE', 'COUPE', 'CROISSANT', 'CROISSANT AMANDES', 'CRUMBLE', 'CRUMBLECARAMEL OU PISTAE', 
  'DELICETROPICAL', 'DEMI BAGUETTE', 'DEMI PAIN', 'DIVERS BOISSONS', 'DIVERS BOULANGERIE', 'DIVERS CONFISERIE', 
  'DIVERS PATISSERIE', 'DIVERS SANDWICHS', 'DIVERS VIENNOISERIE', 'DOUCEUR D HIVER', 'ECLAIR', 
  'ECLAIR FRAISE PISTACHE', 'ENTREMETS', 'FICELLE', 'FINANCIER', 'FINANCIER X5', 'FLAN', 'FLAN ABRICOT', 
  'FONDANT CHOCOLAT', 'FORMULE PATE', 'FORMULE PLAT PREPARE', 'FORMULE SANDWICH', 'FRAISIER', 'FRAMBOISIER', 
  'GACHE', 'GAL FRANGIPANE 4P', 'GAL FRANGIPANE 6P', 'GAL POIRE CHOCO 4P', 'GAL POIRE CHOCO 6P', 'GAL POMME 4P', 
  'GAL POMME 6P', 'GALETTE 8 PERS', 'GD FAR BRETON', 'GD KOUIGN AMANN', 'GD NANTAIS', 'GD PLATEAU SALE', 
  'GRAND FAR BRETON', 'GRANDE SUCETTE', 'GUERANDAIS', 'KOUIGN AMANN', 'MACARON', 'MERINGUE', 'MILLES FEUILLES', 
  'MOISSON', 'NANTAIS', 'NID DE POULE', 'NOIX JAPONAISE', 'PAILLE', 'PAIN', 'PAIN AU CHOCOLAT', 'PAIN AUX RAISINS', 
  'PAIN BANETTE', 'PAIN CHOCO AMANDES', 'PAIN DE MIE', 'PAIN GRAINES', 'PAIN NOIR', 'PAIN S/SEL', 
  'PAIN SUISSE PEPITO', 'PALET BRETON', 'PALMIER', 'PARIS BREST', 'PATES', 'PLAQUE TARTE 25P', 'PLAT', 
  'PLAT 6.50E', 'PLAT 7.00', 'PLAT 7.60E', 'PLAT 8.30E', 'PLATPREPARE5,50', 'PLATPREPARE6,00', 'PLATPREPARE6,50', 
  'PLATPREPARE7,00', 'PT NANTAIS', 'PT PLATEAU SALE', 'QUIM BREAD', 'REDUCTION SUCREES 12', 'REDUCTION SUCREES 24', 
  'RELIGIEUSE', 'ROYAL', 'ROYAL 4P', 'ROYAL 6P', 'SABLE F  P', 'SACHET DE CROUTON', 'SACHET DE VIENNOISERIE', 
  'SACHET VIENNOISERIE', 'SAND JB', 'SAND JB EMMENTAL', 'SANDWICH COMPLET', 'SAVARIN', 'SEIGLE', 'SPECIAL BREAD', 
  'SPECIAL BREAD KG', 'ST HONORE', 'SUCETTE', 'TARTE FINE', 'TARTE FRAISE 4PER', 'TARTE FRAISE 6P', 'TARTE FRUITS 4P', 
  'TARTE FRUITS 6P', 'TARTELETTE', 'TARTELETTE CHOC', 'TARTELETTE COCKTAIL', 'TARTELETTE FRAISE', 'THE', 
  'TRADITIONAL BAGUETTE', 'TRAITEUR', 'TRIANGLES', 'TROIS CHOCOLAT', 'TROPEZIENNE', 'TROPEZIENNE FRAMBOISE', 
  'TULIPE', 'VIENNOISE', 'VIK BREAD'
];

const DAY_OPTIONS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const Predictions: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [selectedBread, setSelectedBread] = useState('');
  const [lastDayQuantity, setLastDayQuantity] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!selectedBread || !lastDayQuantity || selectedDay === '') {
      setError('Please fill in all fields.');
      return;
    }

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {
        menu_name: selectedBread,
        last_day_quantity: parseInt(lastDayQuantity),
        today_day_of_week: parseInt(selectedDay),
      };

      console.log('Sending prediction request:', payload);

      // เปลี่ยนจาก full URL เป็น proxy path
      const response = await axios.post(
        '/api/predict/',
        payload,
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000 // เพิ่ม timeout 30 วินาที
        }
      );

      console.log('Prediction response:', response.data);
      setPrediction(response.data.predicted_quantity);
    } catch (err: any) {
      console.error('Prediction error:', err);
      
      // แสดง error message ที่ละเอียดกว่า
      if (err.response) {
        setError(`API Error: ${err.response.status} - ${err.response.data?.detail || 'Unknown error'}`);
      } else if (err.request) {
        setError('Network error: Unable to reach the prediction server. Please try again.');
      } else {
        setError('Failed to fetch prediction. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">{t('predictSales', 'Predict Sales')}</h1>
        </div>
        <p className="mt-2 text-gray-600">
          {t('predictSalesDescription', "Use AI to predict tomorrow's bread sales and optimize production.")}
        </p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">{t('makePrediction', 'Make a Prediction')}</h2>

        <div className="space-y-4">
          {/* Bread */}
          <div>
            <label htmlFor="bread-select" className="block text-gray-700 font-medium mb-1">
              Bread Product
            </label>
            <select
              id="bread-select"
              value={selectedBread}
              onChange={(e) => setSelectedBread(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3"
            >
              <option value="">Choose a bread</option>
              {BREAD_OPTIONS.map((bread, idx) => (
                <option key={idx} value={bread}>{bread}</option>
              ))}
            </select>
          </div>

          {/* Last Day Quantity */}
          <div>
            <label htmlFor="quantity-input" className="block text-gray-700 font-medium mb-1">
              Quantity Sold Yesterday
            </label>
            <input
              id="quantity-input"
              type="number"
              value={lastDayQuantity}
              onChange={(e) => setLastDayQuantity(e.target.value)}
              placeholder="e.g. 12"
              className="w-full border border-gray-300 rounded-md px-4 py-3"
            />
          </div>

          {/* Day of Week */}
          <div>
            <label htmlFor="day-select" className="block text-gray-700 font-medium mb-1">
              Today (Day of Week)
            </label>
            <select
              id="day-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3"
            >
              <option value="">Choose a day</option>
              {DAY_OPTIONS.map((day, index) => (
                <option key={index} value={index.toString()}>
                  {day} ({index} = {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]})
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Loading...
              </>
            ) : (
              <>
                <Target className="w-5 h-5" />
                Predict
              </>
            )}
          </button>
        </div>
      </section>

      {/* Result */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 min-h-[180px]">
        <h2 className="text-2xl font-semibold mb-4">Tomorrow's Prediction</h2>

        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner size="lg" text="Processing AI prediction..." />
          </div>
        )}

        {!isLoading && prediction !== null && (
          <div className="bg-green-50 border border-green-300 rounded-xl p-6 text-center">
            <CheckCircle className="mx-auto w-10 h-10 text-green-600 mb-2" />
            <p className="text-4xl font-bold text-green-800">{prediction}</p>
            <p className="mt-1 text-green-700 font-medium">Should Produce</p>
            <p className="text-green-600 text-sm">pieces</p>
          </div>
        )}

        {!isLoading && prediction === null && (
          <div className="flex flex-col items-center justify-center text-gray-400 h-32">
            <Target className="w-16 h-16 mb-2" />
            <p>Select input values to start prediction</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Predictions;