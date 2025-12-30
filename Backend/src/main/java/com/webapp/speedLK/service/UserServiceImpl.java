package com.webapp.speedLK.service;


import com.webapp.speedLK.dao.UserDAO;
import com.webapp.speedLK.dto.UserDTO;
import com.webapp.speedLK.exception.UserNotFoundException;
import com.webapp.speedLK.model.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    UserDAO userDAO;
    PasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }




    @Override
    @Transactional
    public String addUser(User user) {
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userDAO.saveUser(user);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    @Transactional
    public String updateUser(User user) {
        try{

            int id = user.getId();
            // get the current user
            User existUser = userDAO.getUserByIDInternal(id);
            if(existUser == null){
                throw new UserNotFoundException("User not found");
            }

            // update only non-null fields
            if(user.getName() != null){
                existUser.setName(user.getName());
            }
            if(user.getEmail()!=null){
                existUser.setEmail(user.getEmail());
            }
            if(user.getPhoneNumber()!=null){
                existUser.setPhoneNumber(user.getPhoneNumber());
            }
            if(user.getPassword()!=null){
                existUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            return userDAO.saveUser(existUser);
        }
        catch (UserNotFoundException e){
            throw e;
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to update user: " + e.getMessage());
        }

    }




    @Override
    public UserDTO getUserByID(int ID) {
        return userDAO.getUserByID(ID);
    }

    // not used
    @Override
    public User findByEmailAndPass(String email, String pass) {

        pass = passwordEncoder.encode(pass);
        return userDAO.findByEmailAndPassword(email,pass);
    }

    @Override
    public UserDTO findByEmail(String email) {
        return userDAO.findByEmail(email);
    }

}
