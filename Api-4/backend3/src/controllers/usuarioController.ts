import UsuarioRepository from "../repositories/UsuarioRepository";
import { IUsuario } from "../Interfaces/IUsuario";
import { Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken'

const usuarioRepository = new UsuarioRepository();
export default class UsuarioController {
    async login(Request: Request, Response: Response) {        
        try {
            const [, hash] = Request.headers.authorization?.split(' ') || [' ', ' '];
            const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
            const primeiraBusca = await usuarioRepository.findByEmail(email);
            if(primeiraBusca){
                const segundaBusca = await usuarioRepository.findByEmailAndSenha(email, password)
                if(segundaBusca){
                    const token = jsonwebtoken.sign(
                        {user: JSON.stringify(segundaBusca)},
                        process.env.TokenJWT,
                        {expiresIn: '60m'}
                    );

                    return Response.status(200).json({data: {segundaBusca, token}})
                }
            }

        } catch(error) {
            console.error(error);
            Response.status(500).json('Internal Server error')
        }
    }

    async findAll(Request: Request, Response: Response) {
        try {
            const usuarios = await usuarioRepository.findAll();
            Response.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async findById(Request: Request, Response: Response) {
        try {
            const id = parseInt(Request.params.id);
            const usuario = await usuarioRepository.findById(id);
            Response.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async save(Request: Request, Response: Response) {
        try {
            const usuario: IUsuario = Request.body;
            await usuarioRepository.create(usuario);
            Response.status(201).json(usuario);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async delete(Request: Request, Response: Response) {
        try {
            const id = parseInt(Request.params.id);
            await usuarioRepository.softDelete(id);
            Response.status(200).json('Usuario removido com sucesso!');
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async update(Request: Request, Response: Response) {
        try {
            const usuario: IUsuario = Request.body;
            await usuarioRepository.update(usuario);
            Response.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async findByEmail(Request: Request, Response: Response) {
        try {
            const email = Request.params.email;
            const usuario = await usuarioRepository.findByEmail(email);
            Response.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async findByEmailAndSenha(Request: Request, Response: Response) {
        try {
            const email = Request.body.email;
            const senha = Request.body.senha;
            const usuario = await usuarioRepository.findByEmailAndSenha(email, senha);
            Response.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

}