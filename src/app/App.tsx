import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import { db, User } from './database';

type ViewState =
  | { page: 'home' }
  | { page: 'product'; productId: string }
  | { page: 'category'; category: string }
  | { page: 'profile' }
  | { page: 'chat'; chatId?: string };

type ModalState = 'none' | 'login' | 'register';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ page: 'home' });
  const [modal, setModal] = useState<ModalState>('none');
  const [user, setUser] = useState<User | null>(null);

  // Restore session on mount
  useEffect(() => {
    const session = db.getSession();
    if (session) setUser(session);
  }, []);

  const navigateToProduct = (productId: string) => setCurrentView({ page: 'product', productId });
  const navigateToCategory = (category: string) => setCurrentView({ page: 'category', category });
  const navigateToHome = () => setCurrentView({ page: 'home' });
  const navigateToProfile = () => setCurrentView({ page: 'profile' });
  const navigateToChat = (chatId?: string) => setCurrentView({ page: 'chat', chatId });

  const openLogin = () => setModal('login');
  const openRegister = () => setModal('register');
  const closeModal = () => setModal('none');

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    closeModal();
  };

  const handleRegisterSuccess = (newUser: User) => {
    setUser(newUser);
    closeModal();
  };

  const handleLogout = () => {
    db.logout();
    setUser(null);
    setCurrentView({ page: 'home' });
  };

  const commonNavProps = {
    user,
    onOpenLogin: openLogin,
    onNavigateToHome: navigateToHome,
    onNavigateToCategory: navigateToCategory,
    onNavigateToProfile: navigateToProfile,
    onNavigateToChat: () => navigateToChat(),
    onLogout: handleLogout,
  };

  const renderPage = () => {
    if (currentView.page === 'profile' && user) {
      return (
        <ProfilePage
          user={user}
          onBack={navigateToHome}
          onNavigateToChat={() => navigateToChat()}
        />
      );
    }

    if (currentView.page === 'chat' && user) {
      return (
        <ChatPage
          user={user}
          initialChatId={currentView.chatId}
          onBack={navigateToHome}
        />
      );
    }

    if (currentView.page === 'product') {
      return (
        <ProductDetail
          productId={currentView.productId}
          onBack={navigateToHome}
          onOpenLogin={openLogin}
          navProps={commonNavProps}
          user={user}
          onStartChat={(chatId) => navigateToChat(chatId)}
        />
      );
    }

    if (currentView.page === 'category') {
      return (
        <CategoryPage
          category={currentView.category}
          onBack={navigateToHome}
          onNavigateToProduct={navigateToProduct}
          onOpenLogin={openLogin}
          navProps={commonNavProps}
          user={user}
        />
      );
    }

    return (
      <HomePage
        onNavigateToProduct={navigateToProduct}
        onNavigateToCategory={navigateToCategory}
        onOpenLogin={openLogin}
        navProps={commonNavProps}
        user={user}
      />
    );
  };

  return (
    <>
      {renderPage()}

      {/* Modals */}
      {modal === 'login' && (
        <LoginPage
          onClose={closeModal}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={openRegister}
        />
      )}
      {modal === 'register' && (
        <RegisterPage
          onClose={closeModal}
          onNavigateToLogin={openLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </>
  );
}
