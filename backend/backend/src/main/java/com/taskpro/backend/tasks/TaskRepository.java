package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import com.taskpro.backend.Users.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository <Task, Long>{
    List<Task> findTasksByCreatedBy(User id);
}
