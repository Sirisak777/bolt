import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;