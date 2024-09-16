import { Request, Response } from "express";
import DetailUserService from "../../services/User/DetailUserService";

export default class DetailUserController {
  static async handle(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId)
      return res
        .status(400)
        .json({ type: "error", message: "Nenhum usuário foi encontrado!" });

    try {
      const user = await DetailUserService.execute(Number(userId));
      res
        .status(200)
        .json({ type: "success", message: "Usuário encontrado com sucesso!", user });
    } catch (err: any) {
      res.status(400).json({ type: "error", message: err.message });
    }
  }
}
