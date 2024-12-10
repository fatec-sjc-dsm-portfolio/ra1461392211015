package com.fatec.pro4tech.services.responseentities.userapp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.repository.RepositorioFuncionario;

@Service
public class UserAppReaderService {
    @Autowired
	private RepositorioFuncionario repository;

	public ResponseEntity<Funcionario> getUser(String cpf) {
		Optional<Funcionario> currentUser = repository.findByCpf(cpf);
		Funcionario user = currentUser.orElse(null);
		if (user == null) {
			return new ResponseEntity<Funcionario>(user, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Funcionario>(user, HttpStatus.FOUND);
		}
	}

	public ResponseEntity<List<Funcionario>> getAllUsers(){
		List<Funcionario> users = repository.findAll();
		return new ResponseEntity<List<Funcionario>> (users, HttpStatus.FOUND);
	}
}
