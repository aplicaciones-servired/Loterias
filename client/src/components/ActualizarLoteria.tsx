import { type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react/jsx-runtime";
import formSchema from "../schemas/scheForm";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { Loteria } from "../types/Interfaces";

export default function ActualizarLoteria(): JSX.Element {
    const { username } = useAuth();
    const [datos, setDatos] = useState<Loteria[]>([])
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
        console.log("Formulario válido, data:", data);
        try {
            const response = await
                axios.post(`http://localhost:3000/getActualizarLoteria`, {
                    //axios.post(`${API_URL}/getLoteria`, {
                    data
                })

            if (response.data.success) {
                setDatos(response.data.data)
                console.log('data', datos)
                if (response.data.data) {
                    toast.info("No hay registros en ese rango de fechas")
                } else {
                    toast.success(response.data.message, { autoClose: 5000 })
                }
            } else {
                toast.error(response.data.message, { autoClose: 5000 })
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

    if (codBarras && codBarras.length >= 20) {
        setValue("CODIGOLOTERIA", codBarras.substring(0, 7));
        setValue("NUMERO_SORTEO", codBarras.substring(7, 11));
        setValue("NUMERO", codBarras.substring(11, 15));
        setValue("SERIE", codBarras.substring(15, 18));
        setValue("FRACCION", codBarras.substring(18, 20));
    }

    const companyname = username.company;
    setValue("EMPRESA", companyname);
    setValue("LOGIN", username.username);
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 font-sans text-center">
                    Actualizar loteria {username.company}
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

                    {/* VALOR y TOTAL renderizados desde datos */}
                    {datos.map((item: Loteria, index) => (
                        <div className="md:col-span-2 grid grid-cols-2 gap-5" key={index}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="VALOR" className="text-slate-700 font-medium">
                                    VALOR
                                </label>
                                <input
                                    type="text"
                                    id="VALOR"
                                    defaultValue={item.VALOR}
                                    placeholder="VALOR"
                                    className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="TOTAL" className="text-slate-700 font-medium">
                                    TOTAL
                                </label>
                                <input
                                    type="text"
                                    id="TOTAL"
                                    defaultValue={item.TOTAL}
                                    placeholder="TOTAL"
                                    className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>
                    ))}

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            onClick={() => console.log("Clic!")}
                            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-50 hover:text-blue-600 hover:border hover:border-blue-600 transition-all duration-300"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}