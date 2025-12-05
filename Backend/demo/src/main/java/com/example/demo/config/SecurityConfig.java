package com.example.demo.config;


import com.example.demo.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationFilter jwtFilter;
    private final JwtService jwtService;


    @Autowired
    public SecurityConfig(JwtService jwtService, AuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
        this.jwtService = jwtService;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {
                })
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(
                                        "/login",
                                        "/add-user",
                                        "/item/*",
                                        "/items",
                                        "/location-id",
                                        "/items-by-user-id/*",
                                        "/items-by-location-id/*"
                                ).permitAll() // allow /login
                                .anyRequest().authenticated()          // all other endpoints require auth
                ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
