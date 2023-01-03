package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasks(){
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUser(User id){
        return taskRepository.findTasksByCreatedBy(id);
    }

    public Task saveTask(Task task){
        return taskRepository.save(task);
    }

    public boolean existById(Long id) {
        return taskRepository.existsById(id);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findTasksById(id);
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}
