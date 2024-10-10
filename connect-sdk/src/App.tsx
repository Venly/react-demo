import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Modal from 'react-modal'
import { venlyConnect } from './libs/venlyConnect'
import Alerts from './components/Alerts'
import Nav from './components/Nav'
import Loading from './pages/Loading'

Modal.setAppElement('#root')

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.info('App mounted, checking authentication');
    checkAuthenticated()
  }, [])

  async function checkAuthenticated() {
    try {
      const res = await venlyConnect.checkAuthenticated()
      console.info('Authentication check result:', res);

      if (!res?.isAuthenticated) {
        console.info('User is not authenticated, redirecting to /login');
        navigate('/login', { replace: true })
      } else {
        console.info('User is authenticated');
      }
    }
    catch(error) {
      console.error('Error during authentication check:', error);
      navigate('/login', { replace: true })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    console.info('Loading state, rendering Loading component');
    return <Loading />
  }
  else if (location.pathname == '/login') {
    console.info('Current route is /login');
    return <Outlet />
  }

  console.info('Rendering main application layout with Nav and Alerts components');
  return <>
    <Nav />
    <div className="main">
      <Outlet />
    </div>
    <Alerts />
    <Toaster
      position="bottom-center"
      containerClassName="toast-container"
      toastOptions={{
        className: "toast"
      }}
    />
  </>
}
