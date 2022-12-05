import { DataTypes, Model } from "sequelize";
import db from "../db";
import Pokemon from "./Pokemon";

class Ability extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
}

Ability.init(
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
  },
  {
    sequelize: db,
    tableName: "ability",
    modelName: "Abilities",
  }
);

Pokemon.hasMany(Ability);
Ability.belongsTo(Pokemon);

export default Ability;
