package com.example.demo.dto;


import lombok.Data;

@Data
public class UserDTO {

    private int id;
    private String email;
    private String name;
    private String phoneNumber;

    public UserDTO(int id, String email, String name, String phoneNumber) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

}
