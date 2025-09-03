import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { BrowserRouters } from './routes/index.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <AuthProvider>
      <>
        <RouterProvider router={BrowserRouters} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </AuthProvider>
  )
}
