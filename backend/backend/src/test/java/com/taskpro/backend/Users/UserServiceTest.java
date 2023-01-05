package com.taskpro.backend.Users;

import com.taskpro.backend.tasks.Status;
import com.taskpro.backend.tasks.Task;
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

public class UserServiceTest{
    @Autowired
    private UserService service;
    @MockBean
    private UserRepository repository;
    @Test
    public void listAllTest(){
        when(repository.findAll()).thenReturn(Stream.of(new User("John","Gitobu","john@gmail.com","axgshjkaka",Role.ADMIN),new User("Michael","Ernest","ernest@gmail.com","ajhskaxj23j",Role.USER)).collect(Collectors.toList()));
        assertEquals(2,service.listAll().size());
    }
    @Test
    public void saveUserTest(){
        User user = new User("Santa","Clause","claus@gmail.com","axgznajkaaka",Role.USER);
        when(repository.save(user)).thenReturn(user);
        assertEquals(user,service.save(user));
    }
    @Test
    public void deleteUserTest(){
        User user = new User("James","Gitau","gitau@gmail.com","dpsdtysdajkaaka",Role.USER);
        service.delete(user.getId());
        verify(repository,times(1)).deleteById(user.getId());
    }
    @Test
    public void getUserByEmail(){
        User user = new User("Santa","Clause","claus@gmail.com","axgznajkaaka",Role.USER);
        when(repository.findByEmail(user.getEmail())).thenReturn(user);
        assertEquals(user,service.get(user.getEmail()));
    }
}


