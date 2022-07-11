import { Op } from "sequelize"
import { Task } from "../models/Task"

export const createTask = async (userId: string, title: string, description: string) => {
    await Task.create({
        userid: userId,
        title,
        description
    })
}

export const listAllTask = async (userId: string) => {
    await Task.findAll({
        where: { userid: userId }
    })
}

export const findById = async (id: string) => {
    return await Task.findOne({ 
        where: { id } 
    });
}

export const editTask = async (id: string, title: string, description: string) => {
    return Task.update({title, description}, {
        where: {
            id
        }
    })
}



export const removeTask = async (id: string) => {
    return await Task.destroy({
        where: {id}
    })
}