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

    @Query(
            value = "SELECT * FROM task ORDER BY due_date desc",
            nativeQuery = true
    )
    List<Task> getAllByDueDateDescending();

    @Query(
            value = "SELECT new com.taskpro.backend.tasks.CountType(COUNT(*), t.status) FROM Task t where t.createdBy = :id GROUP BY t.status"
    )
    List<CountType>getPercentageUserTasksByType(@Param("id") User id);
}
