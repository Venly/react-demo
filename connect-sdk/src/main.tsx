import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Wallet from './pages/Wallet.tsx'

// Logging at the very start
console.log('Starting React application');

// Set up router
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

console.log('Router initialized with routes:', router.routes);

// Rendering the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
)

console.log('Application rendered successfully');
