import { DataTypes, Model } from 'sequelize';
import db from '../db';
import Pokemon from './Pokemon';

class Type extends Model {
  declare id: number;
  declare name: string;
  declare province: string;
};

Type.init({
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
  }

}, {
  sequelize: db,
  tableName: 'types',
  modelName: 'Type'
});


Pokemon.hasMany(Type);
Type.belongsTo(Pokemon);

export default Type;