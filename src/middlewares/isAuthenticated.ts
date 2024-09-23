import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface IToken{
    id: number;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    if(req.headers.authorization){
        const token = (req.headers.authorization).split(' ')[1];
        
        const verifiedToken = jwt.verify(token, process.env.SECRET as string) as IToken;

        req.user_id = verifiedToken.id;

        next();
        return;
    };

    return res.status(422).json({ type: 'error', message: 'Usuário não autenticado!'});
};