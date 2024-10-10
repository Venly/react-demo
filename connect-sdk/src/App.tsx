import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Modal from 'react-modal'
import { venlyConnect } from './libs/venlyConnect'
import Alerts from './components/Alerts'
import Nav from './components/Nav'
import Loading from './pages/Loading'

// Logging when the component mounts
console.log('App component is being initialized');

Modal.setAppElement('#root')

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('App mounted, checking authentication');
    checkAuthenticated()
  }, [])

  async function checkAuthenticated() {
    try {
      const res = await venlyConnect.checkAuthenticated()
      console.log('Authentication check result:', res);

      if (!res?.isAuthenticated) {
        console.log('User is not authenticated, navigating to /login');
        navigate('/login', { replace: true })
      } else {
        console.log('User is authenticated, continuing');
      }
    }
    catch(error) {
      console.error('Error during authentication check:', error);
      navigate('/login', { replace: true })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    console.log('Loading state, rendering Loading component');
    return <Loading />
  }
  else if (location.pathname == '/login') {
    console.log('User is at /login route');
    return <Outlet />
  }

  console.log('Rendering main application layout with Nav and Alerts');
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
