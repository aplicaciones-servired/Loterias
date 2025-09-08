import { Router } from "express";
import { PostLoteria } from "../controllers/Loteria.controllers.js";


export const LoteriaRoute = Router();
 
LoteriaRoute.post("/Loteria", PostLoteria); // Cambiado de /login/:username a /:username



