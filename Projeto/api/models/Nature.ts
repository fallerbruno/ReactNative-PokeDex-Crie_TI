import { DataTypes, Model } from "sequelize";
import db from "../db";
import PokemonRegister from "./PokemonRegister";

class Nature extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare statusUp: string;
  declare statusDown: string;
}

Nature.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusUp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusDown: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize: db,
    tableName: "natures",
    modelName: "Nature",
  }
);

Nature.hasMany(PokemonRegister);
PokemonRegister.belongsTo(Nature);

export default Nature;
