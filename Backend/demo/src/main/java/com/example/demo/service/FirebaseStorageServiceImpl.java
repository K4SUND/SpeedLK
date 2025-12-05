package com.example.demo.service;

import com.google.cloud.storage.Blob;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;


@Service
public class FirebaseStorageServiceImpl implements FirebaseStorageService {


    private final StorageClient storageClient;


    @Autowired
    public FirebaseStorageServiceImpl(FirebaseApp firebaseApp) {
        this.storageClient = StorageClient.getInstance(firebaseApp);
    }

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            Path tempFile = Files.createTempFile(fileName, ".tmp");
            Files.write(tempFile, file.getBytes());


            Blob blob = storageClient.bucket().create(fileName, Files.readAllBytes(tempFile));
            return blob.getMediaLink();

        } catch (IOException e) {
            throw new RuntimeException("Error uploading file to Firebase", e);
        }
    }

    @Override
    public String deleteImage(String fileName) {

        try {
//https://storage.googleapis.com/download/storage/v1/b/speedlk-bcd7d.firebasestorage.app/o/Screenshot%202025-01-23%20200238.jpg?generation=1764872494033254&alt=media
            if (fileName.contains("storage.googleapis.com")) {
                fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                if (fileName.contains("?")) {
                    fileName = fileName.substring(0, fileName.indexOf("?"));
                }
            }

            // Decode %20 → spaces
            fileName = java.net.URLDecoder.decode(fileName, StandardCharsets.UTF_8);

            Blob blob = storageClient.bucket().get(fileName);
            if (blob == null) {
                throw new RuntimeException("File not found: " + fileName);

            }
            blob.delete();
            return "File deleted successfully";

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }


    }
}
