import { PORT } from './config.js';

import express from 'express';
import log from 'morgan';
import cors from 'cors';
import { LoteriaRoute } from './routes/loteria.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const allowlist = (process.env.CORS_ORIGINS || "").split(",");

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      // Permite peticiones sin "Origin" (ej: Postman, curl)
      return callback(null, true);
    }

    // Verifica coincidencia exacta
    if (allowlist.includes(origin)) {
      return callback(null, true);
    }

    // Permite cualquier subdominio de serviredgane.cloud
    if (origin.endsWith(".serviredgane.cloud")) {
      return callback(null, true);
    }

    // Bloquea si no coincide
    return callback(new Error("No permitido por CORS"));
  },
  credentials: true,
}));


app.use(express.json());
app.use(log('dev'));

app.use(LoteriaRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

