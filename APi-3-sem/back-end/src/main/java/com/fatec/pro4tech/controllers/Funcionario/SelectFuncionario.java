package com.fatec.pro4tech.controllers.Funcionario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.services.responseentities.userapp.UserAppReaderService;


@CrossOrigin
@RestController
public class SelectFuncionario {
    @Autowired
	private UserAppReaderService userReader;

	@GetMapping("/listar/funcionario/{cpf}")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro','Sem_Cargo')")
	public ResponseEntity<Funcionario> getUser(@PathVariable String cpf) {
		return userReader.getUser(cpf);
	}

    @GetMapping("/listar/funcionario")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
    public ResponseEntity<List<Funcionario>> listarFuncionarios() {
		return userReader.getAllUsers();
	}
}
