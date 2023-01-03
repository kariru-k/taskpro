package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository <Task, Long>{
    Task findTasksById(Long id);
    List<Task> findTasksByCreatedBy(User id);
}
