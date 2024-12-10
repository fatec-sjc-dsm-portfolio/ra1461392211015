package com.fatec.pro4tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String cep;
	@Column
	private String logradouro;
    @Column
	private String bairro;
	@Column
	private String cidade;
    @Column
	private String estado;
	@Column
	private String complemento;
	@Column
	private String rua;
	
}
