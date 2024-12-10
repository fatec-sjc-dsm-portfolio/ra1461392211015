package com.fatec.pro4tech.services.credentials;

import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.CredentialApp;

@Service
public class CredentialAppValidatorService {
	public boolean isCredentialValid(CredentialApp credential) {
		boolean validation = false;
		if ((credential != null) && ((credential.getUserName() != null) && (credential.getPassword() != null))
				&& (!credential.getUserName().isBlank() && !credential.getPassword().isBlank())) {
			validation = true;
		}
		return validation;
	}
}
