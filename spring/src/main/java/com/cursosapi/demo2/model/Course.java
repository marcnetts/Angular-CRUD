package com.cursosapi.demo2.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data //@Getter + @Setter
@Entity //JPA
//@Table(name = "cursos") //Hibernate já faz isso
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) //autoincrement
	@JsonProperty("_id")
	private Long id;
	@Column(name = "nome", length = 200, nullable = false) //column já é implicito pelo @Enity
	private String name;
	@Column(length = 10, nullable = false) //column já é implicito pelo @Enity
	private String category;

}
