package com.cursosapi.demo2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cursosapi.demo2.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}
