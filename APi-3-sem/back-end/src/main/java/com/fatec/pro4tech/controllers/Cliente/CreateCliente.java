package com.fatec.pro4tech.controllers.Cliente;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fatec.pro4tech.models.ClienteModel;
import com.fatec.pro4tech.services.responseentities.clienteapp.ClienteAppWriterService;



@CrossOrigin
@RestController
public class CreateCliente{
    @Autowired
	private ClienteAppWriterService userWriter;

	@PostMapping("/cadastrar/cliente")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	public ResponseEntity<?> saveUser(@RequestBody ClienteModel user  ) {
		return userWriter.save(user);
	}
}