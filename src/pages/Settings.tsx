import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { useDensity } from '../contexts/DensityContext';
import type { Density } from '../contexts/DensityContext';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
 const { density, setDensity } = useDensity();


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-gray-500 to-slate-600 p-2 rounded-xl ">
            <SettingsIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings')}</h1>
        </div>
        <p className="text-gray-600 dark:text-slate-300">Manage your account and application preferences</p>
      </div>
      <div
  className={`grid grid-cols-1 lg:grid-cols-3 ${
    density === 'compact' ? 'gap-2' : density === 'spacious' ? 'gap-8' : 'gap-6'
  }`}
>
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">{t('name')}</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">{t('email')}</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">{t('shopName')}</label>
                <input
                  type="text"
                  defaultValue={user?.shopName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
                />
              </div>

              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Prediction Alerts',
                  description: 'Get notified when new predictions are ready',
                  defaultChecked: true,
                },
                {
                  title: 'Sales Reports',
                  description: 'Weekly sales summary emails',
                  defaultChecked: true,
                },
                {
                  title: 'Low Stock Alerts',
                  description: 'Alert when predicted sales exceed current stock',
                  defaultChecked: false,
                },
              ].map((item, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Security */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-slate-700 dark:text-white">
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-600 dark:text-slate-300">Update your account password</p>
              </button>

              <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-slate-700 dark:text-white">
                <p className="font-medium">Two-Factor Auth</p>
                <p className="text-sm text-gray-600 dark:text-slate-300">Add extra security to your account</p>
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900 mb-2 dark:text-white">Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      theme === 'light'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      theme === 'dark'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2 dark:text-white">Display Density</p>
                <select
                value={density}
                onChange={(e) => setDensity(e.target.value as Density)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:border-none dark:text-white"
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
                <option value="spacious">Spacious</option>
              </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Data & Privacy</h2>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-blue-800">
                <p className="font-medium">Export Data</p>
                <p className="text-sm opacity-80">Download all your bakery data</p>
              </button>

              <button className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-800">
                <p className="font-medium">Delete Account</p>
                <p className="text-sm opacity-80">Permanently remove your account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;