package com.taskpro.backend.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query(value = "SELECT COUNT(*) from User")
    Long getAll();
}
