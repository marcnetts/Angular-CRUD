package com.cursosapi.demo2;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cursosapi.demo2.model.Course;
import com.cursosapi.demo2.repository.CourseRepository;

@SpringBootApplication
public class CursosAPIApplication {

	public static void main(String[] args) {
		System.out.println("Spring Iniciando...");
		SpringApplication.run(CursosAPIApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository){
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();
			c.setName("Agular com Spring");
			c.setCategory("front-end");
			
			courseRepository.save(c);
		};
	}

}
