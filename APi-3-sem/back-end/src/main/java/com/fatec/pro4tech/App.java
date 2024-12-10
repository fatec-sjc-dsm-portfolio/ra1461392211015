package com.fatec.pro4tech;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.fatec.pro4tech.services.DatabaseInitializer;


@SpringBootApplication
public class App implements CommandLineRunner {
	@Autowired
	private DatabaseInitializer databaseInitializer;
		

	public static void main(String[] args) {
		
		Map<String, Object> configuracao = new HashMap<>();
		configuracao.put("server.port", "8080");
		configuracao.put("spring.datasource.url", "jdbc:mysql://localhost:3306/pro4tech"); // rodar local
		configuracao.put("spring.datasource.username", "root"); // usuario
		configuracao.put("spring.datasource.password", "fatec"); // senha
		configuracao.put("spring.jpa.hibernate.ddl-auto", "create"); // criar editar
		configuracao.put("spring.jpa.show-sql", "true"); // mostrar comandos

		SpringApplication app = new SpringApplication(App.class);
		app.setDefaultProperties(configuracao);
		app.run(args);
	}
		@Bean
		public PasswordEncoder getpasswordEncoder() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
		}
	
	@Override
	public void run(String... args) throws Exception {
		databaseInitializer.initializeDatabase();
	}
	

}
