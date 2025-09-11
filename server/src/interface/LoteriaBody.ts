export interface LoteriaBody {
  ID_PREMIO: string;
  EMPRESA: string;
  CODBARRAS: string;
  CODIGOLOTERIA: string;
  NUMERO_SORTEO: number;
  NUMERO: string;
  SERIE: string;
  FRACCION: number;
  FECHA_SORTEO: string; // o Date si lo parseas
  VALOR: number;
  TOTAL: number;
  APROXIMACIONES?: string;
  LOGIN: string;
}
