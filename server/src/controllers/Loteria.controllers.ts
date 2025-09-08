import type { Request, Response } from "express";
import { Loteria } from "../model/loteria.model.js";
import type { LoteriaBody } from "../interface/LoteriaBody.js";

export const PostLoteria = async (
  req: Request<{}, {}, LoteriaBody>,
  res: Response
): Promise<void> => {
  const data = req.body;
  const empresa = data.EMPRESA === "Servired" ? "39628" : "39627";

  try {
    const loteria = await Loteria.create({
      ZONA: empresa,
      CODBARRAS: data.CODBARRAS,
      CODIGOLOTERIA: data.CODIGOLOTERIA,
      NUMERO_SORTEO: data.NUMERO_SORTEO,
      NUMERO: data.NUMERO,
      SERIE: data.SERIE,
      FRACCION: data.FRACCION,
      FECHA_SORTEO: data.FECHA_SORTEO,
      VALOR: data.VALOR,
      TOTAL: data.TOTAL,
      APROXIMACIONES: data.APROXIMACIONES,
      LOGIN: data.LOGIN,
    });
    res.status(200).json({
      success: true,
      message: "Lotería creada exitosamente",
      data: loteria,
    });
  } catch (error) {
    console.error("Error al crear la lotería", error);
    res.status(500).json({
      success: false,
      message: "Error al crear la Lotería",
      error: error instanceof Error ? error.message : error,
    });
  }
};
