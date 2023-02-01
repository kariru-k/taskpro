package com.taskpro.backend.login;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LoginService {

    @Autowired
    private final LoginRepository loginRepository;

    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public void saveLogs(LoginLogs loginLogs) {
        loginRepository.save(loginLogs);
    }

    public List<LoginLogs> getLogs() {
        return loginRepository.findAll();
    }

}
