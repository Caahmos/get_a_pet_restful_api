import { Request, Response } from "express";
import { RegisterUserRequest } from "../../interfaces/User/RegisterUserRequest";
import RegisterUserService from "../../services/User/RegisterUserService";

class RegisterUserController {
  static async handle(req: Request, res: Response) {
    const registerUserData: RegisterUserRequest = req.body;

    if(!registerUserData.name) return res.status(422).json({ type: 'error', message: 'O campo de nome é obrigatório!'});
    if(!registerUserData.lastName) return res.status(422).json({ type: 'error', message: 'O campo de sobrenome é obrigatório!'});
    if(!registerUserData.birthdate) return res.status(422).json({ type: 'error', message: 'O campo de data de nascimento é obrigatório!'});
    if(!registerUserData.email) return res.status(422).json({ type: 'error', message: 'O campo de email é obrigatório!'});
    if(!registerUserData.phone) return res.status(422).json({ type: 'error', message: 'O campo de número de telefone é obrigatório!'});
    if(!registerUserData.password) return res.status(422).json({ type: 'error', message: 'O campo de senha é obrigatório!'});
    if(!registerUserData.confirmPassword) return res.status(422).json({ type: 'error', message: 'O campo de confirmar senha é obrigatório!'});

    try{
      const registeredUser = await RegisterUserService.execute(registerUserData);
      res.status(200).json({ type: 'success', message: "Usuário cadastrado com sucesso!", registeredUser });
    }catch(err: any){
      res.status(422).json({ type: 'error', message: err.message });
    }
  }
}

export default RegisterUserController;
