import { Model } from "sequelize";

export default function formataLista(lista: Model[]){
    const listaFormatada = []
    for (let i = 0; i < lista.length; i++){
        let listinha = []
        listinha.push(lista[i].dataValues.valor_medida)
        listinha.push(lista[i].dataValues.unixtime)
        listaFormatada.push(listinha)
    }
    return listaFormatada
}