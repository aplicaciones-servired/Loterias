export interface User {
  id: string;
  names: string;
  lastnames: string;
  username: string;
  email: string;
  company: string;
  process: string;
  sub_process: string;
}

export interface Loteria {
  ID_PREMIO: string;
  ZONA: string;
  CODBARRAS: string;
  CODIGOLOTERIA: string;
  NUMERO_SORTEO: string;
  NUMERO: string;
  SERIE: string;
  FRACCION: string;
  FECHA_SORTEO: string;
  VALOR: string;
  TOTAL: string;
  APROXIMACIONES: string;
  LOGIN: string;
  NOMBRE: string;
}
