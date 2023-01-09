package com.taskpro.backend.Users;

import java.util.List;

public interface UserService {

    Long getAll();
    List<User> listAll();
    User save(User user);
    User get(String email);
    void delete(Long id);
    boolean authenticate(String email, String password);


}
