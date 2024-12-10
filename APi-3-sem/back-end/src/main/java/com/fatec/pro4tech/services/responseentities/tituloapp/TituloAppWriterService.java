package com.fatec.pro4tech.services.responseentities.tituloapp;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Titulo;
import com.fatec.pro4tech.repository.RepositorioCliente;
import com.fatec.pro4tech.repository.RepositorioFuncionario;
import com.fatec.pro4tech.repository.RepositorioParcela;
import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.entities.Parcela;
import com.fatec.pro4tech.repository.RepositorioTitulo;
import com.fatec.pro4tech.models.TituloModel;

@Service
public class TituloAppWriterService {
    @Autowired
	private RepositorioTitulo repository;
	@Autowired
	private RepositorioCliente repositoryCliente;
	@Autowired
	private RepositorioFuncionario repositoryFuncionario;
	@Autowired
	private RepositorioParcela repositoryParcela ;

	public ResponseEntity<?> save(TituloModel titulo) {
		try { 
			Titulo titu = new Titulo();
			Optional<Cliente> currentUser = repositoryCliente.findById(titulo.cliente_cpf());
			Optional<Funcionario> currentFunc = repositoryFuncionario.findByCpf(titulo.funcionario_cpf());
			
			
			Date date = new Date();
			titu.setData_geracao(date);
			String S= Float.toString(titulo.valor());
			Float valor1 = Float.parseFloat(S.replace(".","").replace(",", "."));
			titu.setValor(valor1/10); 
			titu.setNome_produto( titulo.nome_produto());
			titu.setCliente( currentUser.get() );
			titu.setFuncionario( currentFunc.get() ); 
			repository.save(titu);
			Titulo target = repository.getById(titu.getId());
            float valor = titu.getValor();
			List<Parcela> listaaa = new ArrayList<>();
            for (int parcelas = 1; parcelas <= 12; parcelas++) {
				Date data_vencimento = new Date();
				data_vencimento.setDate(data_vencimento.getDate() + (parcelas * 30));
                Parcela parcela = new Parcela();
                parcela.setTitulo(titu);
				parcela.setCliente( currentUser.get()); 
				parcela.setValor(titulo.valor());
                parcela.setData_vencimento(data_vencimento);
                parcela.setData_pagamento(null);
                parcela.setData_credito(null); 
                parcela.setStatus(false);
                parcela.setValor(valor / 12);
                parcela.setValor_pago(null);
				parcela.setCodigo_barra(titulo.codigo_barra());
				parcela.setNumero_boleto(titulo.numero_boleto());
				parcela.setQr_code(titulo.qr_code());
				parcela.setNumeroParcelaTitulo(Integer.toString(parcelas));
				repositoryParcela.save(parcela);

				listaaa.add(parcela);
            }

			target.setParcelas(listaaa);
			repository.save(target);

			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}