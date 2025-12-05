package com.example.demo.rest;


import com.example.demo.dto.UserDTO;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UserService user;


    @Autowired
    public UserController(UserService user) {
        this.user = user;
    }


    // not need token
    @PostMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestBody User user1) {
        try {
            return new ResponseEntity<>(user.addUser(user1), HttpStatus.CREATED);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        }

    }


    @GetMapping("/user/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {

        UserDTO userDTO = user.findByEmail(email);
        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @GetMapping("/user/{Id}")
    public ResponseEntity<UserDTO> getUserByID(@PathVariable int Id) {
        UserDTO userDTO = user.getUserByID(Id);
        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return new ResponseEntity<>(user.getUserByID(Id), HttpStatus.OK);
    }

    @PutMapping("/update-user")
    public ResponseEntity<String> updateUser(@RequestBody User user1) {

        try {
            if (user1.getId() == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User Id is required!");
            }
            String result = user.updateUser(user1);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }


    }


}
