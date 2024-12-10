package com.fatec.pro4tech.services.responseentities.clienteapp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.repository.RepositorioCliente;

@Service
public class ClienteAppReaderService {
    @Autowired
	private RepositorioCliente repository;

	public ResponseEntity<Cliente> getUser(String cpf) {
		Optional<Cliente> currentUser = repository.findById(cpf);
		Cliente user = currentUser.orElse(null);
		if (user == null) {
			return new ResponseEntity<Cliente>(user, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Cliente>(user, HttpStatus.FOUND);
		}
	}

	public ResponseEntity<List<Cliente>> getAllUsers(){
		List<Cliente> users = repository.findAll();
		return new ResponseEntity<List<Cliente>> (users, HttpStatus.FOUND);
	}
}
