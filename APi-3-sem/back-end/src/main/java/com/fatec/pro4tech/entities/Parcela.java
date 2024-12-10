package com.fatec.pro4tech.entities;

import java.util.Date;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Parcelas")
@Data
@Getter
@Setter
@JsonIgnoreProperties
public class Parcela {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_parcela;

    @OneToOne(cascade = CascadeType.ALL)
    private Cliente cliente;
    
    @Column
    @Temporal(TemporalType.DATE)
    private Date data_vencimento;

    @Column 
    @Temporal(TemporalType.DATE)
    private Date data_pagamento;

    @Column
    @Temporal(TemporalType.DATE)
    private Date data_credito;

    @Column
    private Boolean status;

    @Column
    private Float valor;

    @Column
    private Float valor_pago;

    @Column
	private String codigo_barra;

	@Column
	private String qr_code;

	@Column
	private String numero_boleto;

    @Column
    private String numeroParcelaTitulo;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "tituloId")
    @JsonBackReference
    private Titulo titulo;
}
