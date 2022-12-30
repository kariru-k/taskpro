package com.taskpro.backend.Users.login;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<LoginLogs, Integer>{
}
