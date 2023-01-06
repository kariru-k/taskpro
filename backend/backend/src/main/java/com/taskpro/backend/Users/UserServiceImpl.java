package com.taskpro.backend.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("User Not found in the database");
        } else {
            System.out.println(username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                null
        );
    }

    public List<User> listAll() {
        return userRepository.findAll();
    }

    public User save(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public User get(String email){
        return userRepository.findByEmail(email);
    }

    public void delete(Long id){
        userRepository.deleteById(id);
    }

    public boolean authenticate(String email, String password){
        User user = userRepository.findByEmail(email);
        if (user == null){
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }

    public String jwtToken(User user){
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put("userID", user.getId());
        claims.put("name", user.getFirstName()+user.getLastName());
        claims.put("email", user.getEmail());

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, "ExtremeProgramming")
                .compact();
    }
}
