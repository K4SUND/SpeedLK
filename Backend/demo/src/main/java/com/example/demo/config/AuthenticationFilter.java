package com.example.demo.config;

import com.example.demo.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final AntPathMatcher pathMatcher;

    private static final List<String> EXCLUDED_PATHS = List.of(
            "/login",
            "/add-user",
            "/item/*",
            "/items",
            "/location-id",
            "/items-by-user-id/*",
            "/items-by-location-id/*"

    );

    @Autowired
    public AuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
        this.pathMatcher = new AntPathMatcher();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getServletPath();
        return EXCLUDED_PATHS.stream()
                .anyMatch(p -> pathMatcher.match(p, path));
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);
            //check expire or valid
            try {


                Claims claims = jwtService.validateToken(token); // parse & validate

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                claims.getSubject(),   // email
                                null,
                                List.of()
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);


            } catch (ExpiredJwtException e) {
                // expired
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token expired");
                return;

            } catch (Exception e) {
                // invalid
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token");
                return;
            }


        } else {
            // no token
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Authorization header missing");
            return;
        }

        filterChain.doFilter(request, response);

    }
}
