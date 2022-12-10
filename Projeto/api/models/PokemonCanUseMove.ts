import { DataTypes, Model } from 'sequelize';
import db from '../db';
import Move from './Move';

class PokemonCanUseMove extends Model {
  declare id: number;
  declare name: string;
};

PokemonCanUseMove.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'pokemoncanusemove',
  modelName: 'pokemoncanusemove'
});


Move.hasMany(PokemonCanUseMove);
PokemonCanUseMove.belongsTo(Move);


export default PokemonCanUseMove;