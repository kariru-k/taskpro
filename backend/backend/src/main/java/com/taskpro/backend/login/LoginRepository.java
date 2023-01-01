package com.taskpro.backend.login;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<LoginLogs, Integer>{
}
