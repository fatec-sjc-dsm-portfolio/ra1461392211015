
export interface IEstacao {
    id_estacao?: number;
    mac_adress: string;
    nome_estacao: string;
    apelido: string;
    latitude: number;
    longitude: number;
    endereco: string;
    createdAt: Date;
    updatedAt: Date;
    status_estacao: boolean;
    id_tipos_parametros?: number[];
}

