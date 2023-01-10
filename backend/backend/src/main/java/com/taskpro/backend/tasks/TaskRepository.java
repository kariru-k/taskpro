package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository <Task, Long>{
    Task findTasksById(Long id);

    @Query(value = "SELECT COUNT(*) from Task t where t.createdBy = :id")
    Long findNumberOfTasksByUser(User id);

    @Query(value = "SELECT COUNT(*) from Task t")
    Long findAllTasks();

    List<Task> findTasksByCreatedBy(User id);

    @Query(value = "SELECT COUNT(*) from Task t WHERE t.dueDate < NOW()")
    Long findOverdueTasks();

    @Query(value = "SELECT task from Task task WHERE task.dueDate < NOW()")
    List<Task> listOverdueTasks();

    @Query(
            value = "SELECT new com.taskpro.backend.tasks.CountType(COUNT(*), t.status) FROM Task t where t.createdBy = :id GROUP BY t.status"
    )
    List<CountType>getPercentageUserTasksByType(@Param("id") User id);
}
