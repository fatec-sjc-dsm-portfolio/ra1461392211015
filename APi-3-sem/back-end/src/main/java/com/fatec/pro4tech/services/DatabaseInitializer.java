package com.fatec.pro4tech.services;

import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.Cliente;
import com.fatec.pro4tech.entities.Contato;
import com.fatec.pro4tech.entities.CredentialApp;
import com.fatec.pro4tech.entities.Endereco;
import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.repository.RepositorioCliente;
import com.fatec.pro4tech.repository.RepositorioFuncionario;
import com.fatec.pro4tech.security.roles.roles;
import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Service
public class DatabaseInitializer {
    @Autowired
	private RepositorioFuncionario repository;
    @Autowired
    private RepositorioCliente repositoryCliente; 
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	public void initializeDatabase() {

        List<Funcionario> temFuncionario = repository.findAll();
        if (temFuncionario.isEmpty()){
            Funcionario root = new Funcionario();
            root.setCpf("497.111.610-95");
            root.setNome("Guilherme Duarte Cenzi Dias");
            root.setRegistration(Calendar.getInstance().getTime());
            root.setEmail("gui@gui.com");
            CredentialApp credencial = new CredentialApp();
            String password = encoder.encode("admin");
            credencial.setPassword(password);
            credencial.setUserName("admin@admin");
            credencial.setRole(roles.Administrador);
            root.setCredential(credencial);

            Cliente cliente = new Cliente();

            cliente.setCpf("335.169.660-41");
            cliente.setNome("Fulano de Tal");
            Contato contato = new Contato();
            contato.setTelefone("(11) 98765-4321");
            contato.setEmail("fulano@example.com");
            cliente.setContato(contato);   

            Endereco endereco = new Endereco();
            endereco.setCep("01234-567");
            endereco.setCidade("São Paulo");
            endereco.setBairro("Centro");
            endereco.setEstado("SP");
            endereco.setLogradouro("Rua Tal, 123");
            endereco.setComplemento("Apto. 456");
            
            cliente.setEndereco(endereco);

            repositoryCliente.save(cliente);

            repository.save(root);

        }
		
	}
}
