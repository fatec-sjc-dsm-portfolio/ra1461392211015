import { IEstacao } from "../interfaces/IEstacao";
import { Estacao } from "../entities/Estacao";

export default class EstacaoRepository {
    async findAll() {
        try {
            // Return all stations using the IEstacao interface and Sequelize
            let estacoes = await Estacao.findAll();
            return estacoes;
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id_estacao: number) {
        try {
            return await Estacao.findByPk(id_estacao);
        } catch (error) {
            console.error(error);
        }
    }

    async findByMacAddress(mac_adress: string) {
        try {
            return await Estacao.findOne({
                where: {
                    mac_adress: mac_adress
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async create(estacao: IEstacao) {
        try {
            return await Estacao.create({
                mac_adress: estacao.mac_adress,
                nome_estacao: estacao.nome_estacao,
                apelido: estacao.apelido,
                latitude: estacao.latitude,
                longitude: estacao.longitude,
                endereco: estacao.endereco,
                status_estacao: estacao.status_estacao
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(estacao: IEstacao) {
        try {
            return await Estacao.update({
                id_estacao: estacao.id_estacao,
                mac_adress: estacao.mac_adress,
                nome_estacao: estacao.nome_estacao,
                apelido: estacao.apelido,
                latitude: estacao.latitude,
                longitude: estacao.longitude,
                endereco: estacao.endereco,
                status_estacao: estacao.status_estacao,
                updatedAt: new Date()
            }, {
                where: {
                    id_estacao: estacao.id_estacao
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async softDelete(id_estacao: number) {
        try {
            return await Estacao.update({
                status_estacao: false,
                updatedAt: new Date()
            }, {
                where: {
                    id_estacao: id_estacao
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}
