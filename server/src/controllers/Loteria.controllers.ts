import type { Request, Response } from "express";
import { getLoteria, Loteria } from "../model/loteria.model.js";
import type { LoteriaBody } from "../interface/LoteriaBody.js";
import { fn, col, where, Op } from "sequelize"

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
  const { fechaInicio, companyname } = req.body;
  console.log("first", fechaInicio, companyname);
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
        [Op.and]: [
          where(fn("DATE", col("CREADO_EN")), "=", fechaInicio),
          { ZONA: empresa },
        ],
      },
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
