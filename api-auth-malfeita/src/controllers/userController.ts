import { Request, Response } from "express"
import { checkPassword, createEncryptedPassword } from "../services/auth";
import { createNewUser, editUser, findByEmailAndNick, findByNick, removeUser } from "../services/UserService";

export const register = async (req: Request, res: Response) => {

    const { nickname, email, password} = req.body;

    const user = await findByEmailAndNick(email, nickname);

    if(user) {
        return res.status(422).json({message: 'E-mail or nickname already exists.'});
    }

    const encryptedPassword = await createEncryptedPassword(password);

    const newUser = await createNewUser(email, nickname, encryptedPassword);

    return res.status(201).json({email, nickname});

}

export const login = async (req: Request, res: Response) => {
    const { nickname, password } = req.body;

    const user = await findByNick(nickname);

    if(!user) {
        return res.status(401).json({message: 'Nickname or/and password is incorrect.'});
    }
    console.log(password, user.password)
    if(! await checkPassword(user, password)) {
        return res.status(401).json({message: 'Nickname or/and password is incorrect.'});
    }

    return res.status(200).json({user: {id: user.id, email: user.email}});
}

export const edit = async (req: Request, res: Response) => {
    const { nickname } = req.params;
    const { newEmail, newNickname } = req.body;

    const user = findByNick(nickname);

    if(!user) {
        return res.status(404).json();
    }

    const verifyNickname = findByNick(newNickname);
    if(newNickname) {
        return res.status(404).json();
    }

    const userEdit = await editUser(nickname, newEmail, newNickname);
    return res.status(200).json({userEdit});
}

export const remove = async (req: Request, res: Response) => {
    const { nickname } = req.params;

    const user = findByNick(nickname);

    if(!user) {
        return res.status(404).json();
    }

    await removeUser(nickname);
    return res.status(200).json();

}