package com.fatec.pro4tech.entities;

import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name = "Clientes")
@Data
@Getter
@Setter

public class Cliente {

    @Id
    @Column(unique = true, nullable = false)
    private String cpf;
    
    @Column
    private String nome;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Endereco endereco;

    @OneToOne(orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Contato contato;

    @Column
    private Date dataNascimento;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "cliente", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Logs> logs;

}
