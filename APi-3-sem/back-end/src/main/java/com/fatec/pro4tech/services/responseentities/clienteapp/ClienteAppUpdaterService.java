package com.fatec.pro4tech.services.responseentities.clienteapp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.entities.Contato;
import com.fatec.pro4tech.entities.Endereco;
import com.fatec.pro4tech.models.ClienteModel;
import com.fatec.pro4tech.repository.RepositorioCliente;

@Service
public class ClienteAppUpdaterService {
    @Autowired
	private RepositorioCliente repository;

	public ResponseEntity<Cliente> update(ClienteModel updateUser) {
		try {
			Optional<Cliente> currentUser = repository.findById(updateUser.cpf());
			Cliente target = currentUser.orElse(null);
            Endereco endereco = new Endereco();
            Contato contato = new Contato();

            if (target == null){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if( updateUser.nome() != null){
             target.setNome( updateUser.nome());
            } else {
                target.setNome(target.getNome());
            }
            if(updateUser.cpf() != null ){
                target.setCpf(updateUser.cpf());
            } else {
                target.setCpf(target.getCpf()); 
            }
            if(updateUser.dataNascimento() != null){
                target.setDataNascimento(updateUser.dataNascimento());
            } else {
                target.setDataNascimento(target.getDataNascimento());
            }
            // -----------Cliente----------------

            if (updateUser.telefone() != null){
                contato.setTelefone(updateUser.telefone());
            } else {
                contato.setTelefone(target.getContato().getTelefone());
            }
    
            if (updateUser.email() != null) {
                contato.setEmail(updateUser.email());
            } else {
                contato.setEmail(target.getContato().getEmail());
            }
             
            target.setContato(contato);
            // -----------Contato----------------

            if (updateUser.cep() != null){
                endereco.setCep(updateUser.cep());
            } else {
                endereco.setCep(target.getEndereco().getCep());
            }
            
            if (updateUser.cidade() != null){
                endereco.setCidade(updateUser.cidade());
            } else {
                endereco.setCidade(target.getEndereco().getCidade());
            }
            
            if (updateUser.bairro() != null){
                endereco.setBairro(updateUser.bairro());
            } else {
                endereco.setBairro(target.getEndereco().getBairro());
            }
        
            if (updateUser.estado() != null){
                endereco.setEstado(updateUser.estado());
            } else {
                endereco.setEstado(target.getEndereco().getEstado());
            }
            
            if (updateUser.logradouro() != null){
                endereco.setLogradouro(updateUser.logradouro());
            } else {
                endereco.setLogradouro(target.getEndereco().getLogradouro());
            }

            if (updateUser.complemento() != null){
                endereco.setComplemento(updateUser.complemento());
            } else {
                endereco.setComplemento(target.getEndereco().getComplemento());
            }
            if(updateUser.rua() != null){
                endereco.setRua(updateUser.rua());
            } else {
                endereco.setRua(target.getEndereco().getRua());
            }
            
            target.setEndereco(endereco);
            repository.save(target);
            
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (InvalidDataAccessApiUsageException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
