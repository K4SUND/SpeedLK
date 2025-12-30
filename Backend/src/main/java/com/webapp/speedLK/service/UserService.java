package com.webapp.speedLK.service;

import com.webapp.speedLK.dto.UserDTO;
import com.webapp.speedLK.model.User;

public interface UserService {

    String addUser(User user);
    String updateUser(User user);
    UserDTO getUserByID(int ID);

    User findByEmailAndPass(String email,String pass);
    UserDTO findByEmail(String email);



}
