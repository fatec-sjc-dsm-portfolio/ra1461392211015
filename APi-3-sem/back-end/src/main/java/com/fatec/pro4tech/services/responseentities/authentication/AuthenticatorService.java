package com.fatec.pro4tech.services.responseentities.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.CredentialApp;
import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.models.AuthenticationModel;
import com.fatec.pro4tech.security.adapters.UserDetailsServiceImpl;
import com.fatec.pro4tech.services.credentials.CredentialAppValidatorService;
import com.fatec.pro4tech.services.jwt.JwtService;
import com.fatec.pro4tech.services.userapp.UserAppService;

@Service
public class AuthenticatorService {
    @Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private UserAppService userAppService;
	@Autowired
	private CredentialAppValidatorService credentialAppValidatorService;
	@Autowired
	private JwtService jwtService;

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	private final String secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
	private final long duration = 9000000;

	
	public ResponseEntity<?> authenticate(CredentialApp credential) {
		ResponseEntity<?> response = new ResponseEntity<>(new AuthenticationModel(), HttpStatus.BAD_REQUEST);
		if (credentialAppValidatorService.isCredentialValid(credential)) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(credential.getUserName());
			if (userDetails != null) {
				Funcionario userApp = userAppService.user(credential.getUserName());
				String jwtToken = this.jwtService.createToken(userDetails.getUsername(), duration, secret);
				jwtToken = "Bearer " + jwtToken;
				AuthenticationModel model = new AuthenticationModel(jwtToken, userApp);
				response = new ResponseEntity<>(model, HttpStatus.ACCEPTED);
			}
		}
		return response;
	}
}
