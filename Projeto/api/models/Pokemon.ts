import { DataTypes, Model } from "sequelize";
import db from "../db";


class Pokemon extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare sex: string;
    declare shiny: boolean;
}

Pokemon.init(
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
        abilityHidden: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        abilityNormal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sprite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        spriteShiny: {
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
    },
    {
        sequelize: db,
        tableName: "pokemon",
        modelName: "Pokemons",
    }
);

export default Pokemon;
