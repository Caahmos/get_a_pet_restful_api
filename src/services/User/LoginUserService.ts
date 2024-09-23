import prisma from "../../prisma/prisma";
import { LoginUserRequest } from "../../interfaces/User/LoginUserRequest";
import { Crypto } from "../../helpers/crypto";
import { Token } from "../../helpers/token";

class LoginUserService{
    static async execute(loginUserData: LoginUserRequest){

        const userExists = await prisma.user.findFirst({
            where: {
                email: loginUserData.email
            }
        });

        if(!userExists) throw new Error('Usuário e/ou senha incorretos!');

        await Crypto.compare(loginUserData.password, userExists.password);

        const token = Token.create({
            id: userExists.id,
            name: userExists.name,
            lastName: userExists.lastName,
            email: userExists.email,
            phone: userExists.phone
        });

        return {
            name: userExists.name,
            lastName: userExists.lastName,
            email: userExists.email,
            phone: userExists.phone,
            token: token
        };
    };
};

export default LoginUserService;