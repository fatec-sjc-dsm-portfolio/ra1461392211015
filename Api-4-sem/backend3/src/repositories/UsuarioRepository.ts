import { IUsuario } from "../Interfaces/IUsuario";
import { Usuario } from "../entities/Usuario";

export default class UsuarioRepository {
    async findAll() {
        try {
            // Return all users using the IUsuario interface and Sequelize
            return await Usuario.findAll();
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id_usuario: number) {
        try {
            return await Usuario.findByPk(id_usuario);
        } catch (error) {
            console.error(error);
        }
    }

    async findByEmail(email: string) {
        try {
            return await Usuario.findOne({
                where: {
                    email: email
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async findByEmailAndSenha(email: string, senha: string) {
        try {
            return await Usuario.findOne({
                where: {
                    email: email,
                    senha: senha
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async create(usuario: IUsuario) {
        try {
            return await Usuario.create({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                role: usuario.role,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(usuario: IUsuario) {
        try {
            return await Usuario.update(
                {
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: usuario.senha,
                    role: usuario.role,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        id: usuario.id_usuario
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async softDelete(id_usuario: number) {
        try {
            return await Usuario.update(
                {
                    status_usuario: false,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        id: id_usuario
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
}
