package com.cursosapi.demo2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cursosapi.demo2.model.Course;
import com.cursosapi.demo2.repository.CourseRepository;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;

@RestController //@Controller + @ResponseBody
@RequestMapping("/api/courses")
//@AllArgsConstructor
public class CourseController {
    //@Autowired //o construtor abaixo e @AllArgsConstructor do lombok já fazem isso
    private final CourseRepository courseRepository; //final = boa prática, não será alterado

    //o @AllArgsConstructor do lombok já faz isso
    public CourseController(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }
    @GetMapping //alternativa abaixo
    public List<Course> list(){
        return courseRepository.findAll();
    }

    // @PostMapping
    // public ResponseEntity<Course> create(@RequestBody Course course){
    //     // System.out.println(course.getName());
    //     // return courseRepository.save(course);
    //     // return course;
    //     return ResponseEntity.status(HttpStatus.CREATED)
    //         .body(courseRepository.save(course));
    // }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course create(@RequestBody Course course){
        return courseRepository.save(course);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Course update(@RequestBody Course course){
        return courseRepository.save(course);
    }
    
    @DeleteMapping
    @RequestMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long courseId){
        courseRepository.delete(courseRepository.getOne(courseId));
    }
}
