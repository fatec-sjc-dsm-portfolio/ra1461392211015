package com.fatec.pro4tech.services.responseentities.logsapp;

import java.sql.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.entities.Logs;
import com.fatec.pro4tech.models.LogModel;
import com.fatec.pro4tech.repository.RepositorioCliente;
import com.fatec.pro4tech.repository.RepositorioFuncionario;
import com.fatec.pro4tech.repository.RepositorioLogs;

@Service
public class LogsAppCreateService {
    @Autowired
	private RepositorioLogs repository;
	@Autowired
	private RepositorioCliente repositoryCliente;
	@Autowired
	private RepositorioFuncionario repositoryFuncionario;
	
	public ResponseEntity<?> save(LogModel log) {
		try {
			Optional<Cliente> currentUser = Optional.empty();
			if(log.cliente_cpf() != null){
				currentUser = repositoryCliente.findById(log.cliente_cpf());
			}
			Optional<Funcionario> currentFunc = repositoryFuncionario.findByCpf(log.funcionario_cpf());
			
			Logs target = new Logs();
			if (currentUser.isPresent()) {
				target.setCliente(currentUser.get());
			} else {
				target.setCliente(null); // ou defina um valor padrão aqui
			}
			target.setFuncionario(currentFunc.get());
			Date date = new Date(System.currentTimeMillis());
			target.setDescricao(log.descricao());
            target.setData(date);
			repository.save(target);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
   