import { Op } from "sequelize";
import { User, UserInstance } from "../models/User";

export const findByEmailAndNick = async (email: string, nickname: string) => {
    return await User.findOne({ 
        where: {
            [Op.or]: [ {email}, {nickname} ]
        } 
    });
}

export const findByNick = async (nickname: string) => {
    return await User.findOne({
        where: {nickname}
    })
}

export const createNewUser = async (email: string, nickname: string, password: string) => {
    await User.create({
        email,
        nickname,
        password
    })
}

export const editUser = async (nickname: string, newEmail: string, newNickname: string) => {
    await User.update({email: newEmail, nickname: newNickname}, {
        where: { nickname }
    })
}

export const removeUser = async (nickname: string) => {
    await User.destroy({
        where: {nickname}
    })
}
