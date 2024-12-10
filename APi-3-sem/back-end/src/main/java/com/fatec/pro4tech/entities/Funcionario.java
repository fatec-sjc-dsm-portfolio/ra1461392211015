package com.fatec.pro4tech.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Funcionarios")
@Data
@Getter
@Setter
public class Funcionario {

    @Id
    @Column(unique = true, nullable = false)
    private String cpf;

    @Column
    private String nome;

    @Column(nullable = false)
	private Date registration;

    @Column(nullable = false)
	private String email;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private CredentialApp credential;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "funcionario", cascade = CascadeType.ALL)
	private List<Logs> logs;

}
