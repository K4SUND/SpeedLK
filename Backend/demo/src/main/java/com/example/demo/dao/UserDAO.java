package com.example.demo.dao;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;

public interface UserDAO {

    String saveUser(User user);
    UserDTO getUserByID(int ID);
    User getUserByIDInternal(int ID);

    User findByEmailAndPassword (String email, String pass);

    UserDTO findByEmail(String email);

    User findByEmailInternal(String email);


}
