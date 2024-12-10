import { IEstacao } from "../Interfaces/IEstacao";
import { Estacao } from "../entities/Estacao";
import ParametroRepository from "./ParametroRepository";
import TipoParametroRepository from "./TipoParametroRepository";

const parametroRepository = new ParametroRepository();
const tipoParametroRepository = new TipoParametroRepository();
export default class EstacaoRepository {
    async findAll() {
        try {
            let estacoes = await Estacao.findAll();
            await Promise.all(estacoes.map(async (estacao) => {
                const campos = await parametroRepository.getIdTipoParametroByEstacao(estacao.get().id_estacao);
                estacao.setDataValue('campos', campos);
            }));
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
