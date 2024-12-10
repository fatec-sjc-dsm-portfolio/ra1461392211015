import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/auth';

interface UserPayload {
    id: string;
    nome: string;
    email: string;
    role?: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'Token não fornecido' });
    }

    try {
        const decoded = verifyToken(token) as UserPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido' });
    }
};