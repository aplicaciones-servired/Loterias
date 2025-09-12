import type { Request, Response } from "express";
import { getLoteria, Loteria } from "../model/loteria.model.js";
import type { LoteriaBody } from "../interface/LoteriaBody.js";
import { fn, col, where, Op, Sequelize, and } from "sequelize";
import { getEquivalencia } from "../model/eqivalencia.mode.js";

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
  const { fechaInicio, fechaFinal, companyname } = req.body;
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
        [Sequelize.col("getEquivalencium.NOMBRE"), "NOMBRE"], // 👈 alias directo
      ],
      where: {
        [Op.and]: [
          where(fn("DATE", col("CREADO_EN")), {
            [Op.between]: [fechaInicio, fechaFinal],
          }),
          { ZONA: empresa },
        ],
      },
      include: [
        {
          model: getEquivalencia,
          attributes: [], // no incluyo nada extra
        },
      ],
      raw: true, // 👈 hace que venga como objeto plano
    });

    res.status(200).json({
      success: true,
      message: "Datos extraídos correctamente",
      data: loteria,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al extraer los datos",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getActualizar = async (
  req: Request<{}, {}, LoteriaBody>,
  res: Response
): Promise<void> => {
  const data = req.body;
  console.log("first", data);
  try {
    const actualizarloteria = await getLoteria.findAll({
      attributes: ["ID_PREMIO", "VALOR", "TOTAL"],
      where: {
        CODIGOLOTERIA: data.CODIGOLOTERIA,
        NUMERO_SORTEO: data.NUMERO_SORTEO,
        SERIE: data.SERIE,
        NUMERO: data.NUMERO,
        FRACCION: data.FRACCION,
        LOGIN: data.LOGIN,
      },
    });
    res.status(200).json({
      success: true,
      message: "loteria consultada corrrectamente",
      data: actualizarloteria,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error extraer los datos",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const PotsActualizar = async (
  req: Request<{}, {}, LoteriaBody>,
  res: Response
): Promise<void> => {
  const data = req.body;
  console.log("first", data);
  try {
    const actualizarloteria = await getLoteria.update(
      {
        VALOR: data.VALOR,
        TOTAL: data.TOTAL,
      },
      {
        where: {
          ID_PREMIO: data.ID_PREMIO,
          CODIGOLOTERIA: data.CODIGOLOTERIA,
          NUMERO_SORTEO: data.NUMERO_SORTEO,
          SERIE: data.SERIE,
          NUMERO: data.NUMERO,
          FRACCION: data.FRACCION,
          LOGIN: data.LOGIN,
        },
      }
    );

    res.status(200).json({ success: true, message: "Actualización exitosa" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Registro no encontrado" });
  }
};
