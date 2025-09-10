import { useAuth } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/Button'
import type { JSX } from "react/jsx-runtime";

const Links = [
  { link: '/home', name: 'Home' },
  //{ link: '/Actualizar', name: 'Actualizar' },
]

const LinkComponent = ({ link, name }: { link: string, name: string }): JSX.Element => {
  return (
    <li>
      <NavLink to={`${link}`} className='font-semibold hover:text-rose-600 dark:hover:text-blue-300'>{name}</NavLink>
    </li>
  )
}

function NavBar (): JSX.Element {
  const { logout } = useAuth()

  return (
    <nav className='bg-blue-300 py-3  rounded-lg'>
      <ul className='flex items-center justify-around'>

        <figure className='flex'>
          <img src="/gane.webp" alt="logo de gane" className='w-[120px]' />
        </figure>

        <div className='flex gap-4 text-xl'>
          {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}
        </div>

        <article className='flex gap-4'>
          <Button onClick={logout}>Cerrar Sesión</Button>
        </article>

      </ul>
    </nav>
  )
}

export default NavBar
