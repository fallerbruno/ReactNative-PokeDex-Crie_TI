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
      type: DataTypes.STRING,
      allowNull: false,
    },
    accuracy: {
      type: DataTypes.INTEGER,
    },
    pp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    effect_chance: {
      type: DataTypes.STRING,
    },
    power: {
      type: DataTypes.INTEGER,
      
    },
    element: {
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
