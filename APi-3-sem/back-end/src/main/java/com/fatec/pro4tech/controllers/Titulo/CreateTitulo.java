package com.fatec.pro4tech.controllers.Titulo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.fatec.pro4tech.models.TituloModel;
import com.fatec.pro4tech.services.responseentities.tituloapp.TituloAppWriterService;

@CrossOrigin
@RestController
public class CreateTitulo {
    @Autowired
	private TituloAppWriterService userWriter;

	@PostMapping("/cadastrar/titulo")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	public ResponseEntity<?> saveUser(@RequestBody TituloModel user) {
		return userWriter.save(user);
	}
}
