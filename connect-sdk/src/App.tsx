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
    checkAuthenticated()
  }, [])

  async function checkAuthenticated() {
    try {
      const res = await venlyConnect.checkAuthenticated()
      if (!res?.isAuthenticated)
        navigate('/login', { replace: true })
    }
    catch(error) {
      console.log('error')
      navigate('/login', { replace: true })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loading />
  }
  else if (location.pathname == '/login')
    return <Outlet />

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