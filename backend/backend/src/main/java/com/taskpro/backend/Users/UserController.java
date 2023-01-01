package com.taskpro.backend.Users;

import com.taskpro.backend.login.LoginLogs;
import com.taskpro.backend.login.LoginRequest;
import com.taskpro.backend.login.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class UserController {
    private final UserService userService;

    private final LoginService loginService;

    public UserController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    //return all users
    @GetMapping("/users")
    public List<User> list() {
        return userService.listAll();
    }


    @GetMapping("/users/{email}")
    public ResponseEntity<User> get(@PathVariable String email) {
        try {
            User user = userService.get(email);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createUser")
    public User add(@RequestBody User user) {
        userService.save(user);
        return user;
    }

    @PostMapping("/users/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request){
        boolean authenticated = userService.authenticate(request.getEmail(), request.getPassword());
        if (authenticated){
            User user = userService.get(request.getEmail());
            loginService.saveLogs(new LoginLogs(user, new Date()));
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
