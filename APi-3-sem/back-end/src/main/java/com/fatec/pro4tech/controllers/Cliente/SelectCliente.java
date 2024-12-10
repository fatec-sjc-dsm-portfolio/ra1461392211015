package com.fatec.pro4tech.controllers.Cliente;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.services.responseentities.clienteapp.ClienteAppReaderService;

@CrossOrigin
@RestController
public class SelectCliente {
    @Autowired
	private ClienteAppReaderService userReader;

	@GetMapping("/listar/cliente/{cpf}")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro','Sem_Cargo')")
	public ResponseEntity<Cliente> getUser(@PathVariable String cpf) {
		return userReader.getUser(cpf);
	}



    @GetMapping("/listar/cliente")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
    public ResponseEntity<List<Cliente>> listarFuncionarios() {
		return userReader.getAllUsers();
	}
}
