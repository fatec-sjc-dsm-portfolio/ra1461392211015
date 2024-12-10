package com.fatec.pro4tech.services.responseentities.Email;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailWithAttachment(String toEmail,
                                        String subject,
                                        String body
                                        ) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("lucasviniciuswinner2012@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body);

        message.setContent(body, "text/html");
        mailSender.send(message);
        System.out.println("Email with attachment sent successfully.");
    }
}
