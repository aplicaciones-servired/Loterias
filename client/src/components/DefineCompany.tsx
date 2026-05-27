import { useAuth } from '../auth/AuthContext'
import type { JSX } from 'react/jsx-runtime'

export function CambiarCompany(): JSX.Element {
  const { username, setUsernames } = useAuth()

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmpresa = e.target.value

    setUsernames({
      ...username,
      company: selectedEmpresa,
    })
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

      <article
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-950/50 sm:px-8"
        role="alert"
        aria-live="polite"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-amber-400/10" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20">
            <svg
              className="h-7 w-7"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300/90">
              Selección de empresa
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Antes de continuar, elige tu empresa
            </h2>
            <p className="mx-auto max-w-md text-sm leading-6 text-slate-300 sm:text-base">
              Tu cuenta está vinculada a más de una empresa. Selecciona una para cargar el entorno correcto.
            </p>
          </div>

          <div className="w-full max-w-sm space-y-3 pt-1">
            <label htmlFor="empresa" className="block text-left text-sm font-medium text-slate-200">
              Empresa
            </label>
            <select
              id="empresa"
              className="w-full cursor-pointer rounded-2xl border border-sky-400/60 bg-white px-4 py-3 text-base font-bold text-slate-900 shadow-lg shadow-sky-500/10 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
              defaultValue=""
              onChange={handleEmpresaChange}
            >
              <option value="" disabled className="text-slate-500">
                Seleccione una empresa
              </option>
              <option value="Servired" className="bg-white text-slate-900">
                Servired
              </option>
              <option value="Multired" className="bg-white text-slate-900">
                Multired
              </option>
            </select>

            <p className="text-xs leading-5 text-slate-400">
              Si eliges la empresa incorrecta, puedes cambiarla nuevamente desde este mismo panel.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
