package com.taskpro.backend.tasks;
import com.taskpro.backend.Users.Role;
import com.taskpro.backend.Users.User;
import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest

public class TaskServiceTest {
    @Autowired
    private TaskService service;
    @MockBean
    private TaskRepository repository;

    @Test
    public void listAllTasksTest(){
        User user = new User("Santa","Clause","claus@gmail.com","axgznajkaaka",Role.USER);
        when(repository.findAll()).thenReturn((List<Task>) Stream.of(new Task("Work on project",Status.PEERREVIEW,new Date(),"The project is on software development", user),new Task("Work on ui design",Status.PEERREVIEW,new Date(),"The task is to be assigned to a UI designer", user)).collect(Collectors.toList()));
        assertEquals(2,service.getTasks().size());
    }
    @Test
    public void saveTaskTest(){
        User user = new User("John","Njau","johny@gmail.com","axduis7e8w87najkaaka",Role.USER);
        Task task = new Task("Work on ux design",Status.PEERREVIEW,new Date(),"This is to be done by the UX designer", user);
        when(repository.save(task)).thenReturn(task);
        assertEquals(task,service.saveTask(task));
    }
    @Test
    public void listTasksByUserTest(){
        User user = new User("James","Gitau","gitau@gmail.com","dpsdtysdajkaaka",Role.USER);
        when(repository.findTasksByCreatedBy(user)).thenReturn((List<Task>) Stream.of(new Task("Release version one",Status.PEERREVIEW,new Date(),"Version one of the software is to be released today", user)).collect(Collectors.toList()));
        assertEquals(1,service.getTasksByUser(user).size());
    }
    @Test
    public void getTaskById(){
        User user = new User("James","Gitau","gitau@gmail.com","dpsdtysdajkaaka",Role.USER);
        Task task = new Task("Work on ux design",Status.PEERREVIEW,new Date(),"This is to be done by the UX designer", user);
        when(repository.findTasksById(task.getId())).thenReturn(task);
        assertEquals(task,service.getTaskById(task.getId()));
    }
    @Test
    public void findNumberOfTasksByUserTest(){
        User user = new User("James","Gitau","gitau@gmail.com","dpsdtysdajkaaka",Role.USER);
        Task task = new Task("Work on ux design",Status.PEERREVIEW,new Date(),"This is to be done by the UX designer", user);
        when(repository.findNumberOfTasksByUser(user)).thenReturn(user.getId());
        assertEquals(user.getId(),service.findNumberOfTasksByUser(user));
    }
    @Test
    public void deleteTaskTest(){
        User user = new User("James","Gitau","gitau@gmail.com","dpsdtysdajkaaka",Role.USER);
        Task task = new Task("Work on ux design",Status.PEERREVIEW,new Date(),"This is to be done by the UX designer", user);
        service.delete(task.getId());
        verify(repository,times(1)).deleteById(task.getId());
    }
    @Test
    public void listOverdueTasksTest(){
        User user = new User("Santa","Clause","claus@gmail.com","axgznajkaaka",Role.USER);
        when(repository.listOverdueTasks()).thenReturn((List<Task>) Stream.of(new Task("Work on project",Status.PEERREVIEW,new Date(),"The project is on software development", user),new Task("Work on ui design",Status.PEERREVIEW,new Date(),"The task is to be assigned to a UI designer", user)).collect(Collectors.toList()));
        assertEquals(2,service.listOverdueTasks().size());
    }
    @Test
    public void findOverdueTaskTest(){
        User user = new User("James","Gitau","gitau@gmail.com","dpsdtysdajkaaka",Role.USER);
        Task task = new Task("Work on ux design",Status.PEERREVIEW,new Date(),"This is to be done by the UX designer", user);
        when(repository.findOverdueTasks()).thenReturn(task);
        assertEquals(task,service.findOverdueTasks());
    }

}