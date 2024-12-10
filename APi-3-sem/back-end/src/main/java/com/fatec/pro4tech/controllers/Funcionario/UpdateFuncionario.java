package com.fatec.pro4tech.controllers.Funcionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.services.responseentities.userapp.UserAppUpdaterService;


@CrossOrigin
@RestController
public class UpdateFuncionario {
    @Autowired
	private UserAppUpdaterService updater;

	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	@PutMapping("/atualizar/funcionario")
	public ResponseEntity<Funcionario> update(@RequestBody Funcionario user) {
		return updater.update(user);
	}
}
