import { lazy, Suspense, type JSX } from 'react'

import { useAuth } from '../auth/AuthContext'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const LoginPage = lazy(async () => await import('../pages/LoginPage'))

function Root (): JSX.Element {
  const { username, isAuthenticated } = useAuth()

  if ((username?.username?.length === 0) || !isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    )
  }

  return (
    <section >
      <NavBar />
      <main className='w-full'>
        <Outlet />
      </main>
    </section>
  )
}

export default Root
