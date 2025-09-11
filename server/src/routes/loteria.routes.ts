import { Router } from "express";
import { PostLoteria, GetLoteria, getActualizar, PotsActualizar } from "../controllers/Loteria.controllers.js";


export const LoteriaRoute = Router();
 
LoteriaRoute.post("/Loteria", PostLoteria); // Cambiado de /login/:username a /:username

LoteriaRoute.post("/getLoteria", GetLoteria); 

LoteriaRoute.post("/getActualizar", getActualizar);

LoteriaRoute.post("/potsActualizar", PotsActualizar);

