package com.fatec.pro4tech.controllers.Funcionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.services.responseentities.userapp.UserAppDeleteService;
@CrossOrigin
@RestController
public class DeleteFuncionario {
    @Autowired
	private UserAppDeleteService deleter;
	
	@DeleteMapping("/deletar/funcionario")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	public ResponseEntity<?> delete(@RequestBody Funcionario user){
		return deleter.delete(user);
	}
}
