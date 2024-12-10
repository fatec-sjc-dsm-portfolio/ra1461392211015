package com.fatec.pro4tech.services.responseentities.userapp;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.repository.RepositorioFuncionario;
import com.fatec.pro4tech.services.credentials.CredentialAppValidatorService;

@Service
public class UserAppWriterService {
    @Autowired
	private RepositorioFuncionario repository;
	@Autowired
	private CredentialAppValidatorService service;
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	public ResponseEntity<?> save(Funcionario user) {
		System.err.println("Criar Cliente");
		try {
			if (service.isCredentialValid(user.getCredential())) {
				String password = user.getCredential().getPassword();
				user.getCredential().setPassword(encoder.encode(password));
			}
			Date registration = new Date();
			user.setRegistration(registration);
			repository.save(user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
