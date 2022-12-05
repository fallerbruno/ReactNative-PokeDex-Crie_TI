import { DataTypes, Model } from "sequelize";
import db from "../db";
import Type from "./Type";
class Move extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare accuracy: number;
  declare PP: number;
  declare condition: string;
}

Move.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accuracy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "moves",
    modelName: "Move",
  }
);

Move.hasMany(Type);
Type.belongsTo(Move);

export default Move;
