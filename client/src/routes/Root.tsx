import { lazy, Suspense} from 'react'

import { useAuth } from '../auth/AuthContext'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import type { JSX } from "react/jsx-runtime";

const LoginPage = lazy(async () => await import('../pages/LoginPage'))


function Root(): JSX.Element {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
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
