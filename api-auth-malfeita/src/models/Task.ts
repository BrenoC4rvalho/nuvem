import { DataTypes, Model } from "sequelize/types";
import { sequelize } from "../instances/pg";

export interface TaskInstance extends Model {
    id: number;
    title: string;
    description: string;
    userid: number;
    done: boolean;
}

export const Task = sequelize.define<TaskInstance>('Task',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    userid: {
        type: DataTypes.NUMBER
    },
    done: {
        type: DataTypes.BOOLEAN
    }

}, {
    tableName: 'tasks',
    timestamps: false
});