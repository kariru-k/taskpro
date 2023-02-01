package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import jakarta.transaction.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final JavaMailSender mailSender;

    public TaskService(TaskRepository taskRepository, JavaMailSender mailSender) {
        this.taskRepository = taskRepository;
        this.mailSender = mailSender;
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

    public Long getAll(){
        return taskRepository.findAllTasks();
    }

    public List<CountType> getPercentageUserTasksByType(User id){
        return taskRepository.getPercentageUserTasksByType(id);
    }

    public Long findNumberOfTasksByUser(User id){
        return taskRepository.findNumberOfTasksByUser(id);
    }

    public Long findOverdueTasks(){
        return taskRepository.findOverdueTasks();
    }

    public List<Task> listOverdueTasks(){
        return taskRepository.listOverdueTasks();
    }

    public List<CountType> listTasksGroupedByStatus() {
        return taskRepository.groupTasksByStatus();
    }

    public void sendEmail(String subject, String body){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Admin");
        message.setTo("karirukeith@gmail.com");
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);


    }
}
