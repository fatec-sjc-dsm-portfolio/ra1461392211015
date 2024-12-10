export interface ITipoParametro {
    id_tipo_parametro?: number;
    nome_campo_json: string;
    nome_sensor: string;
    fator: number;
    offset: number;
    status_tipo_parametro: boolean;
    tipo_sensor: string;
    createdAt: Date;
    updatedAt: Date;
}