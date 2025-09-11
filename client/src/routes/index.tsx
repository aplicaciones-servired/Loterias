import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Root from './Root'

const HomePage = lazy(async () => await import('../pages/HomePage'))
const Actualizar = lazy(async () => await import('../components/ActualizarLoteria'))

export const BrowserRouters = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>
      },
      {
        path: '/actualizar',
        element: <Suspense fallback={<div>Loading...</div>}><Actualizar /></Suspense>
      }
    ]
  }
])
