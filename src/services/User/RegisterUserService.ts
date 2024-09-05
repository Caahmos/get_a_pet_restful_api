import { RegisterUserRequest } from "../../interfaces/User/RegisterUserRequest";
import { Crypto } from "../../helpers/crypto";
import prisma from "../../prisma/prisma";
import { Token } from "../../helpers/token";

class RegisterUserService{
    static async execute(registerUserData: RegisterUserRequest){
        try{

        const emailExists = await prisma.user.findFirst({
            where: {
                email: registerUserData.email
            }
        });

        if(emailExists) throw new Error('Este email já está em uso!');

        if(registerUserData.password !== registerUserData.confirmPassword) throw new Error('As senhas precisam ser iguais!');
        registerUserData.confirmPassword = undefined;

        registerUserData.birthdate = new Date(registerUserData.birthdate);

        const passwordHash = await Crypto.encrypt(10, registerUserData.password);
        registerUserData.password = passwordHash;

            const registeredUser = await prisma.user.create({
                data: registerUserData,
                select: {
                    email: true,
                    name: true,
                    lastName: true,
                }
            });
            
            const token = Token.create(registeredUser);
            
            return {...registeredUser, token};
        }catch(err: any){
            throw new Error(err);
        };
    };
};

export default RegisterUserService;