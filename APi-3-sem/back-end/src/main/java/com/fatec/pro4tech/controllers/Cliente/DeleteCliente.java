package com.fatec.pro4tech.controllers.Cliente;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.services.responseentities.clienteapp.ClienteAppDeleteService;

@RestController
public class DeleteCliente {
 @Autowired
	private ClienteAppDeleteService deleter;
	
	@DeleteMapping("/deletar/cliente/{cpf}")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro','Sem_Cargo')")
	public ResponseEntity<Cliente> getUser(@PathVariable String cpf) {
		return deleter.delete(cpf);
	}
	
	
}
