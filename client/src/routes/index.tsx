import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Root from './Root'

const Home = lazy(async () => await import('../pages/Home'))

export const BrowserRouters = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>
      }
    ]
  }
])
