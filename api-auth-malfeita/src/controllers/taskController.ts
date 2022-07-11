import { Request, Response } from "express";
import { createTask, editTask, findById, listAllTask, removeTask } from "../services/TaskService";

export const create = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const { userId } = req.params;

    if (!title && !description && !userId) {
        return res.status(200).json({message: 'Title or description not identified.'});
        //EDITAR STATUS
    }

    const newTask = await createTask(userId, title, description);
    return res.status(201).json({newTask});
    //EDITAR STATUS
}

export const list = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const tasks = await listAllTask(userId);
    return res.status(200).json({tasks});
}

export const edit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if(!title && !description && !id) {
        return res.status(200).json({message: 'Title or description not identified.'});  
    }

    const task = await editTask(id, title, description);
    return res.status(200).json({task});
}

export const editDone = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const task = await findById(id);
    
    if(task.done == true) {
        
    }
} 
//fazer o edit task done

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await findById(id);

    await removeTask(id);
    res.status(200).json(); 

}