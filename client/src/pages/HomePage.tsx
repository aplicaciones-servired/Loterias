import { useAuth } from '../auth/AuthContext'
import FormLoteria from '../components/FormLoteria';
import { CambiarCompany } from '../components/DefineCompany'
import type { JSX } from "react/jsx-runtime";

function EmpresaPage (): JSX.Element {
  const { username } = useAuth()
  const empresa = username?.company

  return (
    <>
      {(empresa === 'Servired' || empresa === 'Multired')
        ? (
          <FormLoteria zona={username} />
          )
        : (
          <CambiarCompany />
          )}
    </>
  )
}

export default EmpresaPage
