package com.fatec.pro4tech.services.responseentities.userapp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.repository.RepositorioFuncionario;

@Service
public class UserAppUpdaterService {
	@Autowired
	private RepositorioFuncionario repository;
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public ResponseEntity<Funcionario> update(Funcionario updateUser) {
		try {
			Optional<Funcionario> currentUser = repository.findByCpf(updateUser.getCpf());
			Funcionario target = currentUser.orElse(null);
			System.out.println("FOUND " + updateUser);
			if (target == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}

			if(updateUser.getNome() != null){
				target.setNome(updateUser.getNome());
			} else{
				target.setNome(target.getNome());
			}
			if(updateUser.getEmail() != null){
				target.setEmail(updateUser.getEmail());
			} else{
				target.setEmail(target.getEmail());
			}
			if(updateUser.getCpf() != null){
				target.setCpf(updateUser.getCpf());
			} else{
				target.setCpf(target.getCpf());
			}
			if(updateUser.getCredential().getRole() != null){
				target.getCredential().setRole(updateUser.getCredential().getRole());
			} else{
				target.getCredential().setRole(target.getCredential().getRole());
			} 
			if (updateUser.getCredential().getPassword() != null) {
				String password = updateUser.getCredential().getPassword();
				updateUser.getCredential().setPassword(encoder.encode(password));
				target.getCredential().setPassword(updateUser.getCredential().getPassword());
			} else{
				target.getCredential().setPassword(target.getCredential().getPassword());
			}
			if(updateUser.getCredential().getUserName() != null){
				target.getCredential().setUserName(updateUser.getCredential().getUserName());
			} else{
				target.getCredential().setUserName(target.getCredential().getUserName());
			}

			
			
			repository.save(target);
			return new ResponseEntity<>(target, HttpStatus.ACCEPTED);
		} catch (InvalidDataAccessApiUsageException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
