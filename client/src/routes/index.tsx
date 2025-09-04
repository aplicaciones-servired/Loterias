import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Root from './Root'

const ArqueoForm = lazy(async () => await import('../pages/ReporteChat_bot'))


export const BrowserRouters = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Suspense fallback={<div>Loading...</div>}><ArqueoForm /></Suspense>
      }
    ]
  }
])
