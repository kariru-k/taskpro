package com.taskpro.backend.login;
import com.taskpro.backend.Users.Role;
import com.taskpro.backend.Users.User;
import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.mockito.Mockito.*;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest

public class LoginServiceTest {
    @Autowired
    private LoginService service;
    @MockBean
    private LoginRepository repository;

    @Test
    public void LoginServiceTest(){
        User user = new User("John","Njau","njau@gmail.com","axduis7e8w87najkaaka",Role.USER);
        LoginLogs loginLogs = new LoginLogs(user,new Date());
        service.saveLogs(loginLogs);
        verify(repository,times(1)).save(loginLogs);
    }
}