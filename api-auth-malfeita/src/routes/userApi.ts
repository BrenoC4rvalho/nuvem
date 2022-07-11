import { Request, Response, Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();

router.get('/ping', async (req: Request, res: Response) => {
    res.json({pong: true});
})

//public route 
router.post('/register', userController.register);
router.post('/login', userController.login);

//private route
router.put('/:nickname', userController.edit);
router.delete('/:nickname', userController.remove);

export default router;