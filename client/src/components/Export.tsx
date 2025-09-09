// ExportarExcel.ts
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import type { Loteria } from "../types/Interfaces";
import { API_URL } from "../utils/contanst";

export const exportarAExcel = async (fechaInicio?: string, fechaFin?: string, companyname?: string): Promise<void> => {
  let data: Loteria[] = [];

  try {
    const response = await
      //axios.post(`http://localhost:3000/getLoteria`, {
      axios.post(`${API_URL}/getLoteria`, {
        fechaInicio,
        fechaFin,
        companyname
      });

    console.log('first', response.data)

    if (response.data.success) {
      data = response.data.data;
      if (data.length === 0) {
        toast.info("No hay registros en ese rango de fechas");
      } else {
        toast.success(response.data.message, { autoClose: 5000 });
      }
    } else {
      toast.error(response.data.message, { autoClose: 5000 });
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data.message, { autoClose: 5000 });
    } else {
      toast.error((err as Error).message, { autoClose: 5000 });
    }
  }

  if (data.length > 0) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    XLSX.writeFile(wb, "REPORTE_POR_FECHA.xlsx");
  }
};
