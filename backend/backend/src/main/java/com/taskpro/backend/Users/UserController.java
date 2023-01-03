package com.taskpro.backend.Users;

import com.taskpro.backend.login.LoginLogs;
import com.taskpro.backend.login.LoginRequest;
import com.taskpro.backend.login.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/v1")
public class UserController {
    private final UserService userService;

    private final LoginService loginService;

    public UserController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    //return all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> list() {
        List<User> users = userService.listAll();
        if(users.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.ok().body(users);
        }
    }


    //Get user by email
    @GetMapping("/users/{email}")
    public ResponseEntity<User> get(@PathVariable String email) {
        try {
            User user = userService.get(email);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/users/createUser")
    public ResponseEntity<User>add(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.ok().body(user);
    }

    //Log In User
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
