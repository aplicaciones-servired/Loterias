import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useLogin } from '../services/useLogin'
import type { JSX } from "react/jsx-runtime";
import { toast } from 'react-toastify';

function LoginPage(): JSX.Element {
  const { username, setUsername, password, errorString, setPassword, handleSubmit } = useLogin()

  return (
    <section className="h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400">
      <form className='w-96 mb-2 border p-12 rounded-lg bg-white/30 flex flex-col gap-4 shadow-xl' onSubmit={(ev) => { handleSubmit(ev) }}>

        <article className='w-full flex flex-col gap-2'>
          <label className="flex justify-center uppercase">Usuario </label>
          <div className='flex justify-center mb-2'>
            <Input name='username' type='text' placeholder='CP1118342523'  value={username} required 
              onChange={(ev) => { setUsername(ev.target.value) }} />
          </div>
        </article>

        <article className='w-full flex flex-col gap-2'>
          <label className="flex justify-center uppercase ">contraseña</label>
          <div className='flex justify-center mb-2'>
            <Input name='contraseña' type='password' placeholder='***********' autoComplete="off" value={password} required
              onChange={(ev) => { setPassword(ev.target.value) }} />
          </div>
        </article>
        <Button>Iniciar Sesión</Button>
      </form >

      {(errorString !== '') &&
        toast.error(String(errorString), {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }

    </section >
  )
}

export default LoginPage
