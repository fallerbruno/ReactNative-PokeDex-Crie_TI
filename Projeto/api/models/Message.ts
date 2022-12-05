import { DataTypes, Model } from "sequelize";
import db from "../db";
import User from "../models/User";

class Message extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "message",
    modelName: "Message",
  }
);
User.hasMany(Message, {
  as: 'recipient',
  foreignKey: 'recipientId'
});

User.hasMany(Message, {
  as: 'sender',
  foreignKey: 'senderId'
});

Message.belongsTo(User, {
  as: 'recipient',
  foreignKey: 'recipientId'
});

Message.belongsTo(User, {
  as: 'sender',
  foreignKey: 'senderId'
});

export default Message;
