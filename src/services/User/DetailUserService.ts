import prisma from "../../prisma/prisma";

export default class DetailUserService {
    static async execute(userId: number) {
        
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                img: true,
                phone: true
            }
        });

        if(!user) throw new Error('Nenhum usuário foi encontrado!');

        return user;

    };
};