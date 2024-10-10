import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { venlyConnect } from './libs/venlyConnect';
import Alerts from './components/Alerts';
import Nav from './components/Nav';
import Loading from './pages/Loading';

Modal.setAppElement('#root');

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Checking authentication...');
    checkAuthenticated();
  }, []);

  async function checkAuthenticated() {
    try {
      const res = await venlyConnect.checkAuthenticated();
      console.log('Authentication response:', res);
      if (!res?.isAuthenticated) {
        console.log('User not authenticated, redirecting to login...');
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      navigate('/login', { replace: true });
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  } else if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <>
      <Nav />
      <div className="main">
        <Outlet />
      </div>
      <Alerts />
      <Toaster
        position="bottom-center"
        containerClassName="toast-container"
        toastOptions={{
          className: 'toast',
        }}
      />
    </>
  );
}
