import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-amber-100 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Shop Info */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl">
              <img 
                src="/images/nompangmaeo.png" 
                alt="Nom Pung Meaw Logo" 
                className="h-12 w-12 object-contain rounded-lg"
              />
            </div>
            <div>
              <h1 className="font-prompt text-xl font-bold text-gray-900 dark:text-white">
                Nom Pang Maeo
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.shopName}</p>
            </div>
          </div>

          {/* Right: Language + User Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🇺🇸 EN
              </button>
              <button
                onClick={() => setLanguage('th')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'th'
                    ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🇹🇭 TH
              </button>
            </div>

            {/* User Info & Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                  title="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
                  title={t('logout')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;