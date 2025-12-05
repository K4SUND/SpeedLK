package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;

public interface UserService {

    String addUser(User user);
    String updateUser(User user);
    UserDTO getUserByID(int ID);

    User findByEmailAndPass(String email,String pass);
    UserDTO findByEmail(String email);



}
