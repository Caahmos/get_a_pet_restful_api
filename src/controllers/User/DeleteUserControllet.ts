import { Request, Response } from "express";
import DeleteUserService from "../../services/User/DeleteUserService";

export default class DeleteUserController {
    static async handle(req: Request, res: Response) {
        const userId = req.user_id;
        
        if (!userId) return res.status(400).json({ type: 'error', message: 'Nenhum usuário foi encontrado!' });

        try {
            await DeleteUserService.execute(userId);
            res.status(200).json({ type: 'success', message: 'Usuário deletado com sucesso!' });
        } catch (err: any) {
            res.status(400).json({ type: 'error', message: err.message });
        };
    };
};