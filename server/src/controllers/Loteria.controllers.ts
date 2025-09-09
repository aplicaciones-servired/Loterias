import type { Request, Response } from "express";
import { getLoteria, Loteria } from "../model/loteria.model.js";
import type { LoteriaBody } from "../interface/LoteriaBody.js";
import { Op } from "sequelize";

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

export const GetLoteria = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { fechaInicio, fechaFin, companyname } = req.body;
  console.log('first', companyname)
  const empresa = companyname === "Servired" ? "39628" : "39627";
  try {
    const loteria = await getLoteria.findAll({
      attributes: [
        "CODIGOLOTERIA",
        "NUMERO_SORTEO",
        "NUMERO",
        "SERIE",
        "FRACCION",
        "FECHA_SORTEO",
        "VALOR",
        "TOTAL",
        "APROXIMACIONES",
        "LOGIN",
      ],
      where: {
        FECHA_SORTEO: {
          [Op.between]: [fechaInicio, fechaFin], // Finds products with prices between 10 and 50 (inclusive)
        },
        ZONA: {
          [Op.eq]: empresa,
        },
      },
      order: [["CREADO_EN", "DESC"]],
    });
    res.status(200).json({
      success: true,
      message: "datos extraido corrrectamente",
      data: loteria,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error extraer los datos",
      error: error instanceof Error ? error.message : error,
    });
  }
};
