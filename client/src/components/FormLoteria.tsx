import { type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "../types/Interfaces";
import type { JSX } from "react/jsx-runtime";
import formSchema from "../schemas/scheForm";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Input } from "./ui/Input";

import { API_URL } from "../utils/contanst";
import { ExportarAExcel } from "./Export";

const FormLoteria = ({ zona }: { zona: User }): JSX.Element => {
  const companyname = zona?.company ?? "Sin empresa";
  const { username } = useAuth();
  const [fechaInicio, setFechaInicio] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // 👇 función que se ejecuta al enviar el formulario
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await
        //axios.post(`http://localhost:3000/Loteria`, data);
        axios.post(`${API_URL}/Loteria`, data)

      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        reset();
        // 👉 Esperar a que se cierre el diálogo y se renderice de nuevo el input
        setTimeout(() => {
          const input = document.getElementById("CODBARRAS") as HTMLInputElement | null;
          if (input) {
            input.focus();
            input.select();
          }
        }, 100); // 100ms suele ser suficiente
      } else {
        toast.error(response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message, {
          autoClose: 5000,
        });
      } else {
        toast.error("Error al registrar: " + (err as Error).message, {
          autoClose: 5000,
        });
      }
    }
  };

  const valorPremio = watch("VALOR");

  useEffect(() => {
    if (valorPremio) {
      setValue("TOTAL", valorPremio);
    } else {
      setValue("TOTAL", "");
    }
  }, [valorPremio, setValue]);

  // 👀 Escuchar cambios en CODBARRAS
  const codBarras = watch("CODBARRAS");

  useEffect(() => {
    if (codBarras && codBarras.length >= 20) {
      setValue("CODIGOLOTERIA", codBarras.substring(0, 7));
      setValue("NUMERO_SORTEO", codBarras.substring(7, 11));
      setValue("NUMERO", codBarras.substring(11, 15));
      setValue("SERIE", codBarras.substring(15, 18));
      setValue("FRACCION", codBarras.substring(18, 20));
    } else {
      setValue("CODIGOLOTERIA", "");
      setValue("NUMERO_SORTEO", "");
      setValue("NUMERO", "");
      setValue("SERIE", "");
      setValue("FRACCION", "");
    }
  }, [codBarras, setValue]);



  const usuario = username.username;
  setValue("EMPRESA", companyname);
  setValue("LOGIN", usuario);

  return (
    <>
      <section className=' flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4'>
        <div className='flex items-center  md:justify-between gap-2 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white w-4/6 z-50 left-96 mt-1 p-2 px-8 rounded-lg text-slate-950'>
          <label className="text-slate-950">Exportar Por Fecha:</label>
          <Input
            type="date"
            value={fechaInicio}
            onChange={(e) => { setFechaInicio(e.target.value) }}
          />
          <ExportarAExcel fechaInicio={fechaInicio} companyname={companyname} />

        </div>
      </section>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 font-sans text-center">
            Registro Premios {companyname}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CODIGO DE BARRAS */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="CODBARRAS" className="text-slate-700 font-medium">
                CODIGO DE BARRAS COMPLETO
              </label>
              <input
                type="text"
                id="CODBARRAS"
                {...register('CODBARRAS')}
                placeholder="CODIGO DE LA LOTERIA"
                autoComplete="off"
                className="px-4 py-3 border border-slate-400 rounded-md focus:outline-none focus:border-blue-600 text-slate-700 placeholder-slate-4s00"
              />
              {errors.CODBARRAS && (
                <span className="text-red-500 text-sm">
                  {errors.CODBARRAS.message}
                </span>
              )}
            </div>

            {/* NUMERO IDENTIFICADOR */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="EMPRESA" className="text-slate-700 font-medium">
                EMPRESA
              </label>
              <input
                type="text"
                id="EMPRESA"
                {...register('EMPRESA')}
                placeholder="NUMERO IDENTIFICADOR"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>


            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="LOGIN" className="text-slate-700 font-medium">
                USUARIO
              </label>
              <input
                type="text"
                id="LOGIN"
                {...register('LOGIN')}
                placeholder="USUARIO"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>

            {/* NUMERO IDENTIFICADOR */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="CODIGOLOTERIA" className="text-slate-700 font-medium">
                NUMERO IDENTIFICADOR
              </label>
              <input
                type="text"
                id="CODIGOLOTERIA"
                {...register('CODIGOLOTERIA')}
                placeholder="NUMERO IDENTIFICADOR"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>

            {/* NUMERO DE SORTEO */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="NUMERO_SORTEO" className="text-slate-700 font-medium">
                NUMERO DE SORTEO
              </label>
              <input
                type="text"
                id="NUMERO_SORTEO"
                {...register('NUMERO_SORTEO')}
                placeholder="NUMERO DE SORTEO"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>

            {/* NUMERO PREMIADO */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="NUMERO" className="text-slate-700 font-medium">
                NUMERO PREMIADO
              </label>
              <input
                type="text"
                id="NUMERO"
                {...register('NUMERO')}
                placeholder="NUMERO DEL PREMIADO"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>

            {/* SERIE */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="SERIE" className="text-slate-700 font-mediu">
                SERIE DE LA LOTERIA
              </label>
              <input
                type="text"
                id="SERIE"
                {...register('SERIE')}
                placeholder="SERIE"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>

            {/* FRACCION */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="FRACCION" className="text-slate-700 font-medium">
                FRACCION DE LA LOTERIA
              </label>
              <input
                type="text"
                id="FRACCION"
                {...register('FRACCION')}
                placeholder="FRACCION"
                className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                disabled
              />
            </div>


            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="FECHA_SORTEO" className="text-slate-700 font-medium">
                FECHA SORTEO
              </label>
              <input
                type="date"
                id="FECHA_SORTEO"
                {...register('FECHA_SORTEO')}
                placeholder="FECHA DEL SORTEO"
                autoComplete="off"
                className="px-4 py-3 border border-slate-400 rounded-md focus:outline-none focus:border-blue-600 text-slate-700 placeholder-slate-400"
              />
              {errors.FECHA_SORTEO && (
                <span className="text-red-500 text-sm">
                  {errors.FECHA_SORTEO.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="VALOR" className="text-slate-700 font-medium">
                VALOR DEL PREMIO
              </label>
              <input
                type="text"
                id="VALOR"
                {...register('VALOR')}
                placeholder="VALOR DEL PREMIO"
                autoComplete="off"
                className="px-4 py-3 border border-slate-400 rounded-md focus:outline-none focus:border-blue-600 text-slate-700 placeholder-slate-400"
              />
              {errors.VALOR && (
                <span className="text-red-500 text-sm">
                  {errors.VALOR.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="TOTAL" className="text-slate-700 font-medium">
                TOTAL DEL PREMIO
              </label>
              <input
                type="text"
                id="TOTAL"
                {...register('TOTAL')}
                placeholder="TOTAL DEL PREMIO"
                autoComplete="off"
                className="px-4 py-3 border border-slate-400 rounded-md focus:outline-none focus:border-blue-600 text-slate-700 placeholder-slate-400"
              />
              {errors.TOTAL && (
                <span className="text-red-500 text-sm">
                  {errors.TOTAL.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="APROXIMACIONES" className="text-slate-700 font-medium">
                APROXIMACIONES
              </label>
              <textarea
                id="APROXIMACIONES"
                {...register('APROXIMACIONES')}
                rows={6}
                placeholder="APROXIMACIONES"
                autoComplete="off"
                className="px-4 py-3 border border-slate-400 rounded-md focus:outline-none focus:border-blue-600 text-slate-700 placeholder-slate-400 resize-none"
              />

            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-50 hover:text-blue-600 hover:border hover:border-blue-600 transition-all duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormLoteria;
