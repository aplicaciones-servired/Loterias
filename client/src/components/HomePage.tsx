import type { JSX } from 'react'
import { useAuth } from '../auth/AuthContext'
import { CambiarCompany } from '../components/DefineCompany'
import DashBoard from './DashBoard'

function EmpresaPage (): JSX.Element {
  const { username } = useAuth()
  const empresa = username?.company ?? ''

  console.log('Empresa seleccionada:', empresa)

  return (
    <>
      {(empresa === 'Servired' || empresa === 'Multired')
        ? (
          <DashBoard zona={username} />
          )
        : (
          <CambiarCompany />
          )}
    </>
  )
}

export default EmpresaPage
