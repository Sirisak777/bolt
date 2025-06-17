import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Target, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BREAD_OPTIONS = [
  '.', '12 MACARON', 'ARMORICAIN', 'ARTICLE 295', 'BAGUETTE', 'BAGUETTE APERO', 'BAGUETTE GRAINE', 'BANETTE', 
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

const Predictions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const [selectedBread, setSelectedBread] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ quantity: number; confidence: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!selectedBread) {
      setError('Please select a bread product.');
      return;
    }
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        product_name: selectedBread,
        user_id: user.id,
      });
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to fetch prediction. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">{t('predictSales', 'Predict Sales')}</h1>
        </div>
        <p className="mt-2 text-gray-600">
          {t('predictSalesDescription', "Use AI to predict tomorrow's bread sales and optimize production.")}
        </p>
      </header>

      {/* Prediction Form */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">{t('makePrediction', 'Make a Prediction')}</h2>

        <label htmlFor="bread-select" className="block text-gray-700 font-medium mb-2">
          {t('selectBread', 'Select Bread Product')}
        </label>
        <select
          id="bread-select"
          value={selectedBread}
          onChange={(e) => setSelectedBread(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">{t('chooseOption', 'Choose an option')}</option>
          {BREAD_OPTIONS.map((bread, idx) => (
            <option key={idx} value={bread}>
              {bread}
            </option>
          ))}
        </select>

        {error && (
          <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
        )}

        <button
          onClick={handlePredict}
          disabled={isLoading || !selectedBread}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              {t('loading', 'Loading...')}
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              {t('makePrediction', 'Make a Prediction')}
            </>
          )}
        </button>
      </section>

      {/* Prediction Results */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 min-h-[180px]">
        <h2 className="text-2xl font-semibold mb-4">{t('tomorrowPrediction', "Tomorrow's Prediction")}</h2>

        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner size="lg" text={t('processing', 'Processing AI prediction...')} />
          </div>
        )}

        {!isLoading && prediction && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-300 rounded-xl p-6 text-center">
              <CheckCircle className="mx-auto w-10 h-10 text-green-600 mb-2" />
              <p className="text-4xl font-bold text-green-800">{prediction.quantity}</p>
              <p className="mt-1 text-green-700 font-medium">{t('shouldProduce', 'Should Produce')}</p>
              <p className="text-green-600 text-sm">{t('pieces', 'pieces')}</p>
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-xl p-6 text-center">
              <CheckCircle className="mx-auto w-10 h-10 text-blue-600 mb-2" />
              <p className="text-4xl font-bold text-blue-800">{prediction.confidence}%</p>
              <p className="mt-1 text-blue-700 font-medium">{t('confidence', 'Confidence')}</p>
              <p className="text-blue-600 text-sm">AI Accuracy</p>
            </div>
          </div>
        )}

        {!isLoading && !prediction && (
          <div className="flex flex-col items-center justify-center text-gray-400 h-32">
            <Target className="w-16 h-16 mb-2" />
            <p>{t('selectBreadToStart', 'Select a bread product to start prediction')}</p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
      </section>
    </div>
  );
};

export default Predictions;
