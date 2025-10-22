import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import OwnerDashboard from './components/OwnerDashboard.jsx';
import ProviderDashboard from './components/ProviderDashboard.jsx';
import AuthModal from './components/AuthModal.jsx';

export default function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    showAuthModal: false,
    authType: null
  });

  // Simulate checking for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('agnishakti_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        isAuthenticated: true,
        user,
        showAuthModal: false,
        authType: null
      });
    }
  }, []);

  const handleAuthStart = (type) => {
    setAuthState(prev => ({
      ...prev,
      showAuthModal: true,
      authType: type
    }));
  };

  const handleAuthSuccess = (user) => {
    localStorage.setItem('agnishakti_user', JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      showAuthModal: false,
      authType: null
    });
  };

  const handleAuthClose = () => {
    setAuthState(prev => ({
      ...prev,
      showAuthModal: false,
      authType: null
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('agnishakti_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      showAuthModal: false,
      authType: null
    });
  };

  const handleSignIn = () => {
    // Simulate existing user sign in
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner'
    };
    handleAuthSuccess(mockUser);
  };

  if (!authState.isAuthenticated) {
    return (
      <>
        <LandingPage 
          onOwnerRegister={() => handleAuthStart('owner')}
          onProviderRegister={() => handleAuthStart('provider')}
          onSignIn={handleSignIn}
        />
        {authState.showAuthModal && authState.authType && (
          <AuthModal
            type={authState.authType}
            onSuccess={handleAuthSuccess}
            onClose={handleAuthClose}
          />
        )}
      </>
    );
  }

  return authState.user?.role === 'owner' ? (
    <OwnerDashboard user={authState.user} onSignOut={handleSignOut} />
  ) : (
    <ProviderDashboard user={authState.user} onSignOut={handleSignOut} />
  );
}