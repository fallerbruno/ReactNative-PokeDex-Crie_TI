import { DataTypes, Model } from "sequelize";
import db from "../db";
import User from "./User";

class PokemonRegister extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare sex: string;
  declare shiny: boolean;
}

PokemonRegister.init(
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
    type1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type2: {
      type: DataTypes.STRING,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shiny:{
      type: DataTypes.BOOLEAN
    },
    ability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    move4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spatk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spdef: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    tableName: "pokemonregister",
    modelName: "Pokemonsregister",
  }
);

User.hasMany(PokemonRegister);
PokemonRegister.belongsTo(User);

export default PokemonRegister;
