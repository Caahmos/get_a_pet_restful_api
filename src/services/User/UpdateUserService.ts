import prisma from "../../prisma/prisma";
import { UpdateUserRequest } from "../../interfaces/User/UpdateUserRequest";
import fs from "node:fs";
import path from "node:path";
import bcryptjs from "bcryptjs";

class UpdateUserService {
  static async execute(updatedUserData: UpdateUserRequest, userId: number) {
    if (updatedUserData.img) {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          img: true,
        },
      });

      const currentImg = user?.img;

      console.log(currentImg);

      if (currentImg) {
        fs.unlink(
          path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "public",
            "assets",
            "imgs",
            currentImg
          ),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    }

    if (updatedUserData.email) {
      const emailAlreadExists = await prisma.user.findFirst({
        where: {
          email: updatedUserData.email,
        },
        select: {
          email: true,
        },
      });

      if (emailAlreadExists) throw new Error("Esse email já está em uso!");
    }

    if (updatedUserData.password) {
      if (updatedUserData.password !== updatedUserData.confirmPassword)
        throw new Error("As senhas devem ser iguais!");

      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(updatedUserData.password, salt);

      updatedUserData.password = passwordHash;
      updatedUserData.confirmPassword = undefined;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedUserData,
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        img: true,
      },
    });

    return updatedUser;
  }
}

export default UpdateUserService;
