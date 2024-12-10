package com.fatec.pro4tech.controllers.Logs;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fatec.pro4tech.models.LogModel;
import com.fatec.pro4tech.services.responseentities.logsapp.LogsAppCreateService;



@CrossOrigin
@RestController
public class CreateLog{
    @Autowired
	private LogsAppCreateService logcreator;

	@PostMapping("/cadastrar/log")
	@PreAuthorize("hasAnyAuthority('Administrador','Comercial', 'Financeiro')")
	public ResponseEntity<?> saveLog(@RequestBody LogModel log  ) {
		return logcreator.save(log);
	}
}