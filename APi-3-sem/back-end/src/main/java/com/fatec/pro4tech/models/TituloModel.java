package com.fatec.pro4tech.models;

import java.sql.Date;

public record TituloModel(
    String id, 
    String cliente_cpf , 
    String funcionario_cpf,
    Date data_geracao,
    Date data_credito , 
    String numero_boleto, 
    String qr_code , 
    String nome_produto,
    Float valor,
    String codigo_barra , 
    Date data_vencimento , 
    Date data_pagamento ,  
    Boolean status , 
    Float valor_pago) { 

}