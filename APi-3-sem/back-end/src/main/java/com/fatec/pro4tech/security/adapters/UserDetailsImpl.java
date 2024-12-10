package com.fatec.pro4tech.security.adapters;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fatec.pro4tech.entities.CredentialApp;
import com.fatec.pro4tech.security.roles.roles;
import com.fatec.pro4tech.services.credentials.CredentialAppValidatorService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@SuppressWarnings("serial")
public class UserDetailsImpl implements UserDetails {
	private CredentialAppValidatorService service;
	private CredentialApp credential;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		if (service.isCredentialValid(this.credential)) {
			roles role = this.credential.getRole();
			SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.toString());
			authorities.add(authority);
		} else {
			SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roles.Administrador.toString());
			authorities.add(authority);
		}

		return authorities;
	}

	@Override
	public String getPassword() {
		return this.credential.getPassword();
	}

	@Override
	public String getUsername() {
		return this.credential.getUserName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}