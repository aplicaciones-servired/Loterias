import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envPowerBi = z.object({
  DB_POWERBI_USER: z.string(),
  DB_POWERBI_PASSWORD: z.string(),
  DB_POWERBI_HOST: z.string(),
  DB_POWERBI_PORT: z.string().min(2).transform( (e) => parseInt(e)),
  DB_POWERBI_DATABASE: z.string(),
})

const { success, data, error } = envPowerBi.safeParse(process.env)

if (!success) {
  console.error(error.format())
  process.exit(1)
}

export const {
  DB_POWERBI_DATABASE,
  DB_POWERBI_HOST,
  DB_POWERBI_PASSWORD,
  DB_POWERBI_PORT,
  DB_POWERBI_USER
} = data