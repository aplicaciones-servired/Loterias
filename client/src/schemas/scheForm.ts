import { z } from "zod";

const formSchema = z.object({
  CODBARRAS: z.string().nonempty("El código de barras es requerido"),
  CODIGOLOTERIA: z.string().nonempty("El número identificador es requerido"),
  NUMERO_SORTEO: z.string().nonempty("El número de sorteo es requerido"),
  NUMERO: z.string().nonempty("El número premiado es requerido"),
  SERIE: z.string().nonempty("La serie es requerida"),
  FRACCION: z.string().nonempty("La fracción es requerida"),
  EMPRESA: z.string().nonempty("La empresa es requerida"),
  LOGIN: z.string().nonempty("El usuario es requerido"),
  FECHA_SORTEO: z.string().nonempty("La fecha del sorteo es requerida"),
  VALOR: z.string().nonempty("El valor del premio es requerido"),
  TOTAL: z.string().nonempty("El total del premio es requerido"),
  APROXIMACIONES: z.string().optional(), // si no es obligatorio
});

export default formSchema;
