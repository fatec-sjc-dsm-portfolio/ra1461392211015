// AuthController.ts

import { Request, Response } from 'express';
import { comparePassword, createToken, encryptPassword } from '../config/auth';
import UsuarioRepository from '../repositories/UsuarioRepository';

const userRepository = new UsuarioRepository();

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { username, password, name } = req.body;
            const encryptedPassword = await encryptPassword(password);
            const userExists = await userRepository.findByEmail(username);
            if (userExists) {
                return res.status(400).send({ message: 'Usuário já existe' });
            }
            const user = await userRepository.create({ nome: name, email: username, senha: encryptedPassword, role: String(req.query.role ?? 'user') });

            if (user) {
                return res.status(201).send({ message: 'Usuário registrado com sucesso!' });
            }
            return res.status(500).send({ message: 'Erro ao registrar usuário' });

        } catch (error) {
            return res.status(500).send({ message: 'Erro ao registrar usuário' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await userRepository.findByEmail(username);
            const userPassword = user.get().senha;

            if (user && await comparePassword(password, userPassword)) {
                const token = createToken(user.get().id);
                return res.status(200).send({ token });
            }
            return res.status(401).send({ message: 'Usuário ou senha inválidos' });

        } catch (error) {
            return res.status(500).send({ message: 'Erro ao realizar login' });
        }
    }
}
