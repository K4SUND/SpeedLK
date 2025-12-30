package com.webapp.speedLK.dao;

import com.webapp.speedLK.dto.UserDTO;
import com.webapp.speedLK.model.User;

public interface UserDAO {

    String saveUser(User user);
    UserDTO getUserByID(int ID);
    User getUserByIDInternal(int ID);

    User findByEmailAndPassword (String email, String pass);

    UserDTO findByEmail(String email);

    User findByEmailInternal(String email);


}
