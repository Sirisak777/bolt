import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-white border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BakeryAI</h1>
              <p className="text-xs text-gray-500">{user?.shopName}</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🇺🇸 EN
              </button>
              <button
                onClick={() => setLanguage('th')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'th'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🇹🇭 TH
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
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