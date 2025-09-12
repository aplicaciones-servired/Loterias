import { powerBi } from "../db/powerbi.js";
import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes,
} from "sequelize";

class getEquivalencia extends Model<
  InferAttributes<getEquivalencia>,
  InferCreationAttributes<getEquivalencia>
> {
  declare ID: number;
  declare NUMERO: number;
  declare NOMBRE: string;
  declare VERSION: number;
  declare NUMERO_SORTEO: number;
  declare ESTADO: string;
  declare FECHA_CREACION: string | Date;
  declare FECHA_ACTUALIZACION: string | Date;

}
getEquivalencia.init(
  {
    ID: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    NUMERO: { type: DataTypes.INTEGER },
    NOMBRE: { type: DataTypes.STRING(20) },
    VERSION: { type: DataTypes.INTEGER },
    NUMERO_SORTEO: { type: DataTypes.INTEGER },
    ESTADO: { type: DataTypes.STRING(10) },
    FECHA_CREACION: { allowNull: false, type: DataTypes.DATEONLY },
    FECHA_ACTUALIZACION: { allowNull: false, type: DataTypes.DATEONLY },
  },
  {
    sequelize: powerBi,
    modelName: "getEquivalencia",
    tableName: "EQLOTERIASFISICAS",
    timestamps: false,
  }
);

export { getEquivalencia };
