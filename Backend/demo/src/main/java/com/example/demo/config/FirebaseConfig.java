package com.example.demo.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Bean
    FirebaseApp firebaseApp() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("config/serviceAccountKey.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setProjectId("speedlk-bcd7d")
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("speedlk-bcd7d.firebasestorage.app")
                .setDatabaseUrl("https://speedlk-bcd7d-default-rtdb.firebaseio.com")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}