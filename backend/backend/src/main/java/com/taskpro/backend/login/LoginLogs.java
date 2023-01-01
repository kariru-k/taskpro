package com.taskpro.backend.login;

import com.taskpro.backend.Users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Table(name = "user_login_logs")
public class LoginLogs {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long login_id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user_id;
    private Date login_date;


    public LoginLogs(User user_id, Date login_date) {
        this.user_id = user_id;
        this.login_date = new Date();
    }

    public LoginLogs() {

    }

    public Long getLogin_id() {
        return login_id;
    }

    public void setLogin_id(Long login_id) {
        this.login_id = login_id;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public Date getLogin_date() {
        return login_date;
    }

    public void setLogin_date(Date login_date) {
        this.login_date = login_date;
    }
}
