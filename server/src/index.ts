import { PORT } from './config.js';

import express from 'express';
import log from 'morgan';
import cors from 'cors';
import { LoteriaRoute } from './routes/loteria.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const allowlist = process.env.CORS_ORIGINS as string

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowlist.includes(origin)) {
      callback(null, origin); // devuelve solo 1 origin válido
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(log('dev'));

app.use(LoteriaRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

