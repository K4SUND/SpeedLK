package com.example.demo.rest;


import com.example.demo.model.User;
import com.example.demo.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

     private JwtService jwt;


     @Autowired
     public LoginController(JwtService jwt) {
            this.jwt = jwt;

     }


     // calls default constructor ( no args )
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user)
    {

        return new ResponseEntity<>(jwt.generateToken(user.getEmail(), user.getPassword()),HttpStatus.ACCEPTED);


    }



}
