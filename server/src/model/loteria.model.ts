import { powerBi } from "../db/powerbi.js";
import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes,
} from "sequelize";

class Loteria extends Model<
  InferAttributes<Loteria>,
  InferCreationAttributes<Loteria>
> {
  declare ID_PREMIO?: number;
  declare ZONA: string;
  declare CODBARRAS: string;
  declare CODIGOLOTERIA: string;
  declare NUMERO_SORTEO: number;
  declare NUMERO: string;
  declare SERIE: string;
  declare FRACCION: number;
  declare FECHA_SORTEO: string | Date;
  declare VALOR: number;
  declare TOTAL: number;
  declare APROXIMACIONES?: string | undefined;
  declare LOGIN: string;
  declare CREADO_EN?: Date;
  declare ACTUALIZADO_EN?: Date;
}

  Loteria.init(
    {
      ID_PREMIO: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      ZONA: { type: DataTypes.STRING(10) },
      CODBARRAS: { type: DataTypes.STRING(20) },
      CODIGOLOTERIA: { type: DataTypes.STRING(20) },
      NUMERO_SORTEO: { type: DataTypes.INTEGER },
      NUMERO: { type: DataTypes.STRING(10) },
      SERIE: { type: DataTypes.STRING(10) },
      FRACCION: { type: DataTypes.INTEGER },
      FECHA_SORTEO: { allowNull: false, type: DataTypes.DATEONLY },
      VALOR: { type: DataTypes.DECIMAL(12, 2) },
      TOTAL: { type: DataTypes.DECIMAL(12, 2) },
      APROXIMACIONES: { type: DataTypes.STRING },
      LOGIN: { type: DataTypes.STRING(15) },
      CREADO_EN: { type: DataTypes.DATE },
      ACTUALIZADO_EN: { type: DataTypes.DATE },
    },
    {
      sequelize: powerBi,
      modelName: "Loteria",
      tableName: "PREMIOS_LOTERIA_FISICA",
      timestamps: false, // ya tienes CREADO_EN y ACTUALIZADO_ENf
    }
  );


export { Loteria };
