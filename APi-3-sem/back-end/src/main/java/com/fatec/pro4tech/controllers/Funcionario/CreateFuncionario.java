package com.fatec.pro4tech.controllers.Funcionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pro4tech.entities.Funcionario;
import com.fatec.pro4tech.models.EnvioEmail;
import com.fatec.pro4tech.security.roles.roles;
import com.fatec.pro4tech.services.responseentities.Email.EmailSenderService;
import com.fatec.pro4tech.services.responseentities.userapp.UserAppWriterService;
import jakarta.mail.MessagingException;
import jakarta.annotation.security.PermitAll;

@CrossOrigin
@RestController
public class CreateFuncionario {
    @Autowired
	private UserAppWriterService userWriter;
	@Autowired
	private EmailSenderService emailSenderService;

	@PostMapping("/funcionarios/cadastrar")
	@PermitAll
	public ResponseEntity<?> saveUser( @RequestBody Funcionario user) {
		user.getCredential().setRole(roles.Sem_Cargo);
		return userWriter.save(user);
	}

	@PostMapping("/email")
    @PermitAll
    public ResponseEntity<?> sendEmail(@RequestBody EnvioEmail email) {
        try {
            String toEmail = email.email();
            String subject = "Cobrança de Titulo";
            String body = 
            "<html> " +
              "<head>" +
              "</head>" +
              "<body>" +
              "<h1> Aviso de Cobrança </h1>" +
              "<p> A cobrança no valor de <b> R$" + email.valor() + "</b> referente ao produto <b>" + email.nome_produto() + "</b> já esta disponivel para pagamento.</p>" +
              "<p> a sua fatura tem data de vencimento para o dia:<b>" + email.data_vencimento() + "</b></p>" +
              "<h3> Atenciosamente, CopiloTTeam </h3>" +
              "</body>" +
            "</html>";
            emailSenderService.sendEmailWithAttachment(toEmail, subject, body);
            return ResponseEntity.ok("Email sent successfully.");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
}
