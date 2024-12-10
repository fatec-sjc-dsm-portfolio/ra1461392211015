package com.fatec.pro4tech.services.responseentities.tituloapp;

import java.util.Optional;

import com.fatec.pro4tech.models.TituloModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Titulo;
import com.fatec.pro4tech.repository.RepositorioTitulo;

@Service
public class TituloAppUpdaterService {
	@Autowired
	private RepositorioTitulo repository;

	public ResponseEntity<Titulo> update(TituloModel updateTitulo , String id) {
		try {
			Optional<Titulo> currentUser = repository.findById(id);
			Titulo target = currentUser.orElse(null);
            
            if (target == null){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            if (updateTitulo.valor() != null){
                target.setValor(updateTitulo.valor());
            } else {
                target.setValor(target.getValor());
            }
            if(updateTitulo.nome_produto() != null){
                target.setNome_produto(updateTitulo.nome_produto());
            } else {
                target.setNome_produto(target.getNome_produto());
            }

			repository.save(target);
			return new ResponseEntity<>( HttpStatus.ACCEPTED);
		} catch (InvalidDataAccessApiUsageException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
