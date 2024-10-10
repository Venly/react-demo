import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Wallet from './pages/Wallet.tsx'


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/wallets/:id',
        element: <Wallet />,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
)
