package com.cursosapi.demo2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController //@Controller + @ResponseBody
@RequestMapping("/")
public class HelloController {

    @GetMapping //alternativa abaixo
    //@RequestMapping(method = RequestMethod.GET, produces = )
    public @ResponseBody String hello(){
        return "Hello worlds!"; //livereload já faz isso
    }
    // public static void main(String[] args) {
    // }

}
