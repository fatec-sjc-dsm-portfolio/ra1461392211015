package com.fatec.pro4tech.security.adapters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.services.credentials.CredentialAppValidatorService;
import com.fatec.pro4tech.services.userapp.UserAppService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserAppService userAppService;
	@Autowired
	private CredentialAppValidatorService credentialAppValidatorService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Funcionario user = this.userAppService.user(username);
		if (user != null) {
			return new UserDetailsImpl(credentialAppValidatorService, user.getCredential());
		} else {
			return null;
		}
	}
}