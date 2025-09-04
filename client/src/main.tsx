import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouters } from './routes/index.tsx'
import './index.css';
import axios from 'axios';
import { AuthProvider } from './auth/AuthContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Configuración importante para manejo de credenciales
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={BrowserRouters} />
    <ToastContainer position="top-right" autoClose={3000} />
  </AuthProvider>
)
