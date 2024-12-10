package com.fatec.pro4tech.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Logs")
@Data
@Getter
@Setter
@JsonIgnoreProperties
public class Logs {
    @Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "funcionario_cpf")
    @JsonBackReference
    private Funcionario funcionario;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "cliente_cpf")
    @JsonBackReference
    private Cliente cliente;

    @Column(nullable = true)
    private Date data;

    @Column(nullable = false)
    private String descricao;
}
