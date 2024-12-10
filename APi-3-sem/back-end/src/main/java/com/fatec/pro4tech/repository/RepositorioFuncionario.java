package com.fatec.pro4tech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.pro4tech.entities.Funcionario;

public interface RepositorioFuncionario extends JpaRepository<Funcionario, String>{

    Optional<Funcionario> findByCpf(String cpf);
}