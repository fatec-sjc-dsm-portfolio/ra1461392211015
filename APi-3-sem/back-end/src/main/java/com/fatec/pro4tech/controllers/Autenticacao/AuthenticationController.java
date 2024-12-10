package com.fatec.pro4tech.controllers.Autenticacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.CredentialApp;
import com.fatec.pro4tech.services.responseentities.authentication.AuthenticatorService;

import jakarta.annotation.security.PermitAll;

@CrossOrigin
@RestController
public class AuthenticationController {
    
    @Autowired
	private AuthenticatorService authenticatorService;

	@PostMapping("/login")
	@PermitAll
	public ResponseEntity<?> authenticate(@RequestBody CredentialApp credential) {
		return this.authenticatorService.authenticate(credential);
	}
}
