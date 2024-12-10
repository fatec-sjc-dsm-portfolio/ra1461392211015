package com.fatec.pro4tech.models;

import com.fatec.pro4tech.entities.Funcionario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthenticationModel {
    private String token;
	private Funcionario funcionario;
}
