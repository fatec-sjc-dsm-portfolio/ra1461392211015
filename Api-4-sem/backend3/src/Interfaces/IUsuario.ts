export interface IUsuario {
    id_usuario?: number;
    nome?: string;
    email?: string;
    senha?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status_usuario?: boolean;
}