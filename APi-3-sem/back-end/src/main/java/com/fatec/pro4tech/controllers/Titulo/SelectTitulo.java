package com.fatec.pro4tech.controllers.Titulo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.Titulo;
import com.fatec.pro4tech.services.responseentities.tituloapp.TituloAppReaderService;

@CrossOrigin
@RestController
public class SelectTitulo {
    @Autowired
	private TituloAppReaderService userReader;

	@GetMapping("/listar/titulo/{id_titulo}")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro','Sem_Cargo')")
	public ResponseEntity<Titulo> getUser(@PathVariable String id_titulo) {
		return userReader.getUser(id_titulo);
	}

    @GetMapping("/listar/titulo")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
    public ResponseEntity<List<Titulo>> listarTitulos() {
		return userReader.getAllTitulos();
	}
}
