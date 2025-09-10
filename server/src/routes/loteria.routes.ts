import { Router } from "express";
import { PostLoteria, GetLoteria, GetActualizarLoteria } from "../controllers/Loteria.controllers.js";


export const LoteriaRoute = Router();
 
LoteriaRoute.post("/Loteria", PostLoteria); // Cambiado de /login/:username a /:username

LoteriaRoute.post("/getLoteria", GetLoteria); 

LoteriaRoute.post("/getActualizarLoteria", GetActualizarLoteria); 


