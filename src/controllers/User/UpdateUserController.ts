import { Request, Response } from "express";
import { UpdateUserRequest } from "../../interfaces/User/UpdateUserRequest";
import UpdateUserService from "../../services/User/UpdateUserService";

class UpdateUserController{
    static async handle(req: Request, res: Response){
        const updatedUserData: UpdateUserRequest = req.body;

        const userId = req.user_id;
        if(!userId) return res.status(422).json({ type: 'error', message: 'Usuário não autenticado!'});

        if(req.file){
            updatedUserData.img = req.file.filename;
        };

        try{
            const updatedUser = await UpdateUserService.execute(updatedUserData, userId);
            res.status(200).json({ type: 'success', message: 'Usuário atualizado com sucesso!', updatedUser});
        }catch(err: any){
            res.status(422).json({ type: 'error', message: err.message});
        };
    };
};

export default UpdateUserController;