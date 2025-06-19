import React, { useState } from 'react';
import { Croissant } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-amber-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-3/4 left-1/3 w-16 h-16 bg-yellow-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left side - Branding */}
        <div className="flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-12 flex-col justify-center relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white bg-opacity-20 p-3 rounded-2xl">
                <Croissant className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">BakeryAI</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Nom Pang Meaw
            </h2>
            
            <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
              Reduce waste, increase profits, and optimize your production with our intelligent sales forecasting system.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>AI-powered sales predictions</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Reduce food waste by up to 30%</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Optimize daily production planning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="w-full lg:w-1/2 p-12 flex items-center justify-center">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;