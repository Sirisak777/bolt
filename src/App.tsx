import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Predictions from './pages/Predictions';
import History from './pages/History';
import Settings from './pages/Settings';
import LoadingSpinner from './components/common/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading BakeryAI..." />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading BakeryAI..." />
      </div>
    );
  }

  return (
    <Routes>
      {/* Landing Page - Public */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Page - Redirect to Predictions if already authenticated */}
      <Route 
        path="/auth" 
        element={isAuthenticated ? <Navigate to="/app/predictions" replace /> : <AuthPage />} 
      />
      
      {/* Protected App Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/predictions" replace />} />
        <Route path="predictions" element={<Predictions />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Catch all - redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppRoutes />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
