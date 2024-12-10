package com.fatec.pro4tech.controllers.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.models.ClienteModel;
import com.fatec.pro4tech.services.responseentities.clienteapp.ClienteAppUpdaterService;




@RestController
public class UpdateCliente {
    @Autowired
	private ClienteAppUpdaterService updater;
    
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	@PutMapping("/atualizar/cliente")
	public ResponseEntity<Cliente> update(@RequestBody ClienteModel user) {
		return updater.update(user);
	}
}
