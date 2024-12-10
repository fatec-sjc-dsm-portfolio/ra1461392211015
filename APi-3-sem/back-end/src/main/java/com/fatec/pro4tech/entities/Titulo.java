package com.fatec.pro4tech.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType; 
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Titulos")
@Data
@Getter
@Setter
@JsonIgnoreProperties
public class Titulo {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private Funcionario funcionario;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private Cliente cliente;

	@Column
	@Temporal(TemporalType.DATE)
	private Date data_geracao; 

	@Column
	private Float valor;

	@Column 
	private String nome_produto;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "titulo", cascade = CascadeType.ALL)
	@JsonManagedReference 
	private List<Parcela> parcelas;
}
