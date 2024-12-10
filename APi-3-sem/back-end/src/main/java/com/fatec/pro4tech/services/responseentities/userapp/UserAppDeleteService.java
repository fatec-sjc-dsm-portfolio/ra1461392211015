package com.fatec.pro4tech.services.responseentities.userapp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.repository.RepositorioFuncionario;

@Service
public class UserAppDeleteService {
    @Autowired
	private RepositorioFuncionario repository;

	public ResponseEntity<?> delete(Funcionario user) {
		try {
			System.out.println(user);
			Optional<Funcionario> currentUser = repository.findByCpf(user.getCpf());
			Funcionario target = currentUser.orElse(null);
			if(target == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			System.out.println(target);
			repository.delete(target);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch (InvalidDataAccessApiUsageException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
