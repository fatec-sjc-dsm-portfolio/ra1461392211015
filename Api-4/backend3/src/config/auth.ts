import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = '191f2667-3967-4ec9-ac0c-73782527083e'; // Use uma chave forte em produção
const SALT_ROUNDS = 10;

// Função para criar um token JWT
export const createToken = (userId: string): string => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

// Função para verificar um token JWT
export const verifyToken = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, SECRET_KEY);
};

// Função para criptografar uma senha
export const encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

// Função para verificar uma senha
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
