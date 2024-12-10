
import { Model } from "sequelize";

export class Dados {
    vel_vento: Model[]
    dir_vento: Model[]
    umidade: Model[]
    temperatura: Model[]
    pressao: Model[]
    pluv: Model[]


    atribuirDado(atributo: string, dado: Model[]) {
        if (atributo == "vel"){
            this.vel_vento = dado;
        }else if (atributo == "dir"){
            this.dir_vento = dado;
        }else if (atributo == "prs"){
            this.pressao = dado;
        }else if (atributo == "plu"){
            this.pluv = dado;
        }else if (atributo == "umi"){
            this.umidade = dado;
        }else {
            this.temperatura = dado;
        }
    }
}