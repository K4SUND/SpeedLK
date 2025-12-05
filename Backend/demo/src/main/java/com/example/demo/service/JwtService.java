package com.example.demo.service;

import io.jsonwebtoken.Claims;

public interface JwtService {

    String generateToken(String email,String passWord);

    Claims validateToken(String token);


}
