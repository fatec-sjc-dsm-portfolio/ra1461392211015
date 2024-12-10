package com.fatec.pro4tech.controllers.Titulo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.fatec.pro4tech.models.TituloModel;
import com.fatec.pro4tech.services.responseentities.tituloapp.TituloAppUpdaterService;;

@CrossOrigin
@RestController
public class UpdateTitulo {
 @Autowired
	private TituloAppUpdaterService userWriter;

	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	@PutMapping("/atualizar/titulo/{id_titulo}")
	public ResponseEntity<?> saveUser(@RequestBody TituloModel updateTitulo , @PathVariable String id_titulo) {
		return userWriter.update(updateTitulo, id_titulo);
	}
}
