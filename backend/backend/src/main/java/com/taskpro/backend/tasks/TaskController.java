package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //Get Tasks
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskService.getTasks();
        if (tasks.isEmpty()){
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(tasks);
        }
    }


    //Get Task By Id
    @GetMapping ("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if(task != null){
            return ResponseEntity.ok().body(task);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    //Get Tasks By User
    @GetMapping("/tasks/users/{id}")
    public ResponseEntity<List<Task>> getTasksByUser(@PathVariable User id) {
        List<Task> tasks = taskService.getTasksByUser(id);
        if (!tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(tasks);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Get percentage of tasks by status
    @GetMapping("/tasks/users/percentages/{id}")
    public ResponseEntity<List<CountType>> getPercentageUserTasksByType(@PathVariable User id){
        List<CountType> countTypeList = taskService.getPercentageUserTasksByType(id);
        Long total = taskService.findNumberOfTasksByUser(id);
        if(countTypeList.isEmpty() && total == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        for(CountType i: countTypeList){
            i.setCount(i.getCount()/total * 100);
        }
        return ResponseEntity.ok().body(countTypeList);
    }


    //Create a Task
    @PostMapping("/tasks")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }



    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task taskrequest,@PathVariable Long id) {
        if(taskService.existById(id)){
            Task task = taskService.getTaskById(id);
            task.setTitle(taskrequest.getTitle());
            task.setDescription(taskrequest.getDescription());
            task.setDueDate(taskrequest.getDueDate());
            task.setStatus(taskrequest.getStatus());
            task.setCreatedBy(taskrequest.getCreatedBy());

            taskService.saveTask(task);
            return ResponseEntity.ok().body(task);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<String>deleteTask(@PathVariable Long id){
        if(taskService.existById(id)){
            taskService.delete(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

