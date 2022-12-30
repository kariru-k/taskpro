package com.taskpro.backend.Users;

import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<User> listAll() {
        return userRepository.findAll();
    }

    public void save(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    public User get(String email){
        return userRepository.findByEmail(email);
    }

    public void delete(Integer id){
        userRepository.deleteById(id);
    }

    public boolean authenticate(String email, String password){
        User user = userRepository.findByEmail(email);
        if (user == null){
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }

}
