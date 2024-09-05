import { Request, Response } from "express";
import { LoginUserRequest } from "../../interfaces/User/LoginUserRequest";
import LoginUserService from "../../services/User/LoginUserService";

class LoginUserController{
    static async handle(req: Request, res: Response){
        const loginUserData: LoginUserRequest = req.body;

        if(!loginUserData.email) throw new Error('Informe o seu email!');
        if(!loginUserData.password) throw new Error('Informe a sua senha!');

        try{
            const loggedUser = await LoginUserService.execute(loginUserData);
            res.status(200).json({ type: 'success', message: 'Usuário entrou com sucesso!', loggedUser })
        }catch(err: any){
            res.status(422).json({ type: 'error', message: err.message })
        }
    };
};

export default LoginUserController;