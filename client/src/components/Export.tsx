import * as XLSX from 'xlsx'
import type { Loteria } from '../types/Interfaces'
import type { JSX } from 'react/jsx-runtime'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { API_URL } from '../utils/contanst'

interface ExportarAExcelProps {
  fechaInicio: string
  companyname: string
}

export function ExportarAExcel({ fechaInicio, companyname }: ExportarAExcelProps): JSX.Element {
  const [datos, setDatos] = useState<Loteria[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await
          //axios.post(`http://localhost:3000/getLoteria`, {
          axios.post(`${API_URL}/getLoteria`, {
            fechaInicio,
            companyname
          })

        if (response.data.success) {
          setDatos(response.data.data)
          if (response.data.data.length === 0) {
            toast.info("No hay registros en ese rango de fechas")
          } else {
            toast.success(response.data.message, { autoClose: 5000 })
          }
        } else {
          toast.error(response.data.message, { autoClose: 5000 })
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message, { autoClose: 5000 })
        } else {
          toast.error((err as Error).message, { autoClose: 5000 })
        }
      }
    }

    void fetchData() // ✅ aquí se llama una sola vez
  }, [fechaInicio, companyname])

  const titulo = [{ A: 'Reporte Loteria' }, {}]
  const hora = new Date()
  const infoCreacción = { A: `Fecha De Creación ${hora.toLocaleString()}` }
  const longitudes = [25, 25, 20, 10, 10, 10, 35]

  const handleDownload = (): void => {
    const tabla = [
      {
        A: 'Numero identificador',
        B: 'Numero sorteo',
        C: 'Numero Jugado',
        D: 'Serie',
        E: 'Fraccion',
        F: 'Fecha Sorteo',
        G: 'Valor',
        H: 'Total',
        I: 'Aproximacion',
        J: 'Usuerio',
      }
    ]


    datos.forEach((item) => {
      tabla.push({
        A: item.CODIGOLOTERIA,
        B: item.NUMERO_SORTEO,
        C: item.NUMERO,
        D: item.SERIE,
        E: item.FRACCION,
        F: item.FECHA_SORTEO,
        G: parseInt(item.VALOR, 10).toString(),
        H: parseInt(item.TOTAL, 10).toString(),
        I: item.APROXIMACIONES,
        J: item.LOGIN,
      })
    })

    const dataFinal = [...titulo, infoCreacción, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 1000)
  }

  const creandoArchivo = (dataFinal: unknown[]): void => {
    const libro = XLSX.utils.book_new()
    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true })

    hoja['!merges'] = [
      XLSX.utils.decode_range('A1:G1'),
      XLSX.utils.decode_range('A2:G2'),
      XLSX.utils.decode_range('A3:G3')
    ]

    const simpiedades: XLSX.ColInfo[] | Array<{ width: number }> | undefined = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    XLSX.utils.book_append_sheet(libro, hoja, 'Items')
    XLSX.writeFile(libro, 'LOTERIA_POR_FECHA.xlsx')
  }

  return (

    <button
      type="button"
      onClick={handleDownload}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg "
    >
      Exportar a Excel
    </button>

  )
}

