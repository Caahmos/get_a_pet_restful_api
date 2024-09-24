import prisma from "../../prisma/prisma";
import fs from 'node:fs';
import path from 'node:path';

export default class DeleteUserService {
    static async execute(userId: number) {

        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    img: true
                }
            });

            if (!user) throw new Error('Nenhum usuário foi encontrado!');

            await prisma.user.delete({
                where: {
                    id: userId
                }
            });

            if (user.img) {
                fs.unlink(
                  path.resolve(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "public",
                    "assets",
                    "imgs",
                    user.img
                  ),
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              }
        } catch (err) {
            throw new Error('Erro ao deletar usuário!');
        };
    };
};