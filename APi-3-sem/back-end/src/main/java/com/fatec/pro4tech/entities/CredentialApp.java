package com.fatec.pro4tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import com.fatec.pro4tech.security.roles.roles;


@Entity
@Data
public class CredentialApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String userName;
	@Enumerated(EnumType.STRING)
    private roles role;
}
