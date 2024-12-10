package com.fatec.pro4tech.services.userapp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.repository.RepositorioFuncionario;

@Service
public class UserAppService {
    @Autowired
	private RepositorioFuncionario repository;
	
	public Funcionario user(String userName) {
		List<Funcionario> users = repository.findAll();
		Funcionario target = null;
		for (Funcionario user : users) {
			if (user.getCredential() != null) {
				if (user.getCredential().getUserName().equals(userName)) {
					target = user;
					break;
				}
			}
		}
		return target;
	}

	public Funcionario getUser(String cpf) {
		Optional<Funcionario> currentUser = repository.findByCpf(cpf);
		Funcionario user = currentUser.orElse(null);

		return user;
	}
}
