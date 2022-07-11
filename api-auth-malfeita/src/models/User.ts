import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UserInstance extends Model {
    id: number;
    nickname: string;
    email: string;
    password: string;
    token: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nickname: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});