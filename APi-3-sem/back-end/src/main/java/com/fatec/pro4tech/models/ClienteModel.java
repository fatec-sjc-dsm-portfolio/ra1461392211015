package com.fatec.pro4tech.models;

import java.sql.Date;

public record ClienteModel(
    String cpf, 
    String nome, 
    String telefone, 
    String email, 
    String cep, 
    String rua, 
    String bairro, 
    String cidade, 
    String estado, 
    String logradouro, 
    String complemento,
    Date dataNascimento) {
    
}
