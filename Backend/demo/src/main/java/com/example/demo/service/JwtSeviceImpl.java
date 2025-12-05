package com.example.demo.service;

import com.example.demo.dao.UserDAO;
import com.example.demo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;


@Service
public class JwtSeviceImpl implements JwtService {


    UserDAO userDAO;
    PasswordEncoder passwordEncoder;

    final SecretKey key;


    @Autowired
    public JwtSeviceImpl(UserDAO userDAO, @Value("${jwt.secret}") String secret, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String generateToken(String email, String password) {

        User user = userDAO.findByEmailInternal(email);


        //user null
        if (user == null) {
            return "User not found";
        }

        //authentication
        if (passwordEncoder.matches(password, user.getPassword())) {

            long expirationMillis = 1000 * 60 * 60 * 5; // 5 hour
            Date now = new Date();
            Date expiryDate = new Date(now.getTime() + expirationMillis);

            //user authenticated
            //generate token  that include this user
            String token = Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("id", user.getId())
                    .setIssuedAt(now)
                    .setExpiration(expiryDate)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();


            return token;


        }


        return "Invalid password";


    }

    @Override
    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody(); // throws ExpiredJwtException if expired
    }


}
