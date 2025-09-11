import { useForm, type SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import type { Loteria } from "../types/Interfaces"
import { toast } from "react-toastify"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { API_URL } from "../utils/contanst"

export default function ActualizarLoteria() {
    const { username } = useAuth();
    const [datos, setDatos] = useState<Loteria[]>([])
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm<Loteria>()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // 👉 Consultar
    const onSubmit: SubmitHandler<Loteria> = async (data) => {
        try {
            const response = await
            //axios.post("http://localhost:3000/getActualizar", data)
            axios.post(`${API_URL}/Loteria`, data)

            setDatos(response.data.data)

            if (response.data.success && response.data.data.length > 0) {
                const loteria = response.data.data[0]
                setValue("ID_PREMIO", loteria.ID_PREMIO)
                setValue("VALOR", loteria.VALOR)
                setValue("TOTAL", loteria.TOTAL)
                toast.success(response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                handleClose(); // solo cerrar el dialog
                toast.error(response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                handleClose(); // solo cerrar el dialog
                toast.error(err.response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                handleClose()
            }
        }
    }

    // 👉 Actualizar
    const handleActualizar: SubmitHandler<Loteria> = async (data) => {
        try {
            const response = await 
            // axios.post("http://localhost:3000/PotsActualizar", data)
            axios.post(`${API_URL}/Loteria`, data)
            if (response.data.success) {
                toast.success(response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                handleClose(); // solo cerrar el dialog
                reset({
                    ZONA: username.company,
                    LOGIN: username.username,
                    CODBARRAS: "",
                    CODIGOLOTERIA: "",
                    NUMERO_SORTEO: "",
                    NUMERO: "",
                    SERIE: "",
                    FRACCION: "",
                    VALOR: "",
                    TOTAL: "",
                });

            } else {
                toast.error(response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error("Error al actualizar");
        }
    }

    const valorPremio = watch("VALOR");

    useEffect(() => {
        if (valorPremio) {
            setValue("TOTAL", valorPremio);
        }
    }, [valorPremio, setValue]);


    const codBarras = watch("CODBARRAS");

    if (codBarras && codBarras.length >= 20) {
        setValue("CODIGOLOTERIA", codBarras.substring(0, 7));
        setValue("NUMERO_SORTEO", codBarras.substring(7, 11));
        setValue("NUMERO", codBarras.substring(11, 15));
        setValue("SERIE", codBarras.substring(15, 18));
        setValue("FRACCION", codBarras.substring(18, 20));
    }


    const companyname = username.company;
    setValue("ZONA", companyname);
    setValue("LOGIN", username.username);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 font-sans text-center">
                    Actualizar loteria {username.company}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {errors.CODBARRAS && <span>Este campo es obligatorio</span>}

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="CODBARRAS" className="text-slate-700 font-medium">
                            CODIGO DE BARRAS COMPLETO
                        </label>
                        <input
                            type="text"
                            id="CODBARRAS"
                            {...register('CODBARRAS')}
                            placeholder="CODIGO DE LA LOTERIA"
                            className="px-4 py-3 border border-slate-400 rounded-md focus:outline-none focus:border-blue-600 text-slate-700"
                        />
                        {errors.CODBARRAS && (
                            <span className="text-red-500 text-sm">{errors.CODBARRAS.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label htmlFor="EMPRESA" className="text-slate-700 font-medium">
                            EMPRESA
                        </label>
                        <input
                            type="text"
                            id="EMPRESA"
                            {...register('ZONA')}
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
                            className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label htmlFor="CODIGOLOTERIA" className="text-slate-700 font-medium">
                            NUMERO IDENTIFICADOR
                        </label>
                        <input
                            type="text"
                            id="CODIGOLOTERIA"
                            {...register('CODIGOLOTERIA')}
                            className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label htmlFor="NUMERO_SORTEO" className="text-slate-700 font-medium">
                            NUMERO DE SORTEO
                        </label>
                        <input
                            type="text"
                            id="NUMERO_SORTEO"
                            {...register('NUMERO_SORTEO')}
                            className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label htmlFor="NUMERO" className="text-slate-700 font-medium">
                            NUMERO PREMIADO
                        </label>
                        <input
                            type="text"
                            id="NUMERO"
                            {...register('NUMERO')}
                            className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label htmlFor="SERIE" className="text-slate-700 font-medium">
                            SERIE DE LA LOTERIA
                        </label>
                        <input
                            type="text"
                            id="SERIE"
                            {...register('SERIE')}
                            className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label htmlFor="FRACCION" className="text-slate-700 font-medium">
                            FRACCION DE LA LOTERIA
                        </label>
                        <input
                            type="text"
                            id="FRACCION"
                            {...register('FRACCION')}
                            className="px-4 py-3 border border-slate-400 rounded-md bg-slate-200 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            onClick={handleClickOpen}
                            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-200 hover:text-blue-600 hover:border hover:border-blue-600 transition-all duration-300"
                        >
                            Consultar
                        </button>
                    </div>
                </form>
            </div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <form onSubmit={handleSubmit(handleActualizar)}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        VALORES PARA ACTUALIZAR
                    </DialogTitle>
                    <DialogContent dividers>
                        <div>
                            <input type="hidden" {...register("ID_PREMIO")} />
                            <div className="flex flex-col gap-2 md:col-span-1">
                                <label htmlFor="VALOR" className="text-slate-700 font-medium">VALOR</label>
                                <input
                                    type="text"
                                    id="VALOR"
                                    {...register("VALOR")}
                                    className="px-4 py-3 border border-slate-400 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-1">
                                <label htmlFor="TOTAL" className="text-slate-700 font-medium">TOTAL</label>
                                <input
                                    type="text"
                                    id="TOTAL"
                                    {...register("TOTAL")}
                                    className="px-4 py-3 border border-slate-400 rounded-md"
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" autoFocus className="w-full bg-blue-600 text-white">
                            actualizar datos
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
