package com.fatec.pro4tech.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.pro4tech.entities.Titulo;



public interface RepositorioTitulo extends JpaRepository<Titulo, Long>{

    Optional<Titulo> findById(String id);

  
}