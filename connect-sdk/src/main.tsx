import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Wallet from './pages/Wallet.tsx';

// Logging statements
console.log('Application is starting...');
console.log('VITE_CLIENT_ID:', import.meta.env.VITE_CLIENT_ID);
console.log('VITE_ENV:', import.meta.env.VITE_ENV);

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
    ],
  },
]);

// Error handling during application initialization
try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
  console.log('Application initialized successfully.');
} catch (error) {
  console.error('Error during initialization:', error);
}
