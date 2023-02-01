package com.taskpro.backend.tasks;

import com.taskpro.backend.Users.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    //Get all overdue tasks
    @GetMapping("/tasks/overdue")
    public ResponseEntity<List<Task>> getOverDueTasksByUser() {
        List<Task> tasks = taskService.listOverdueTasks();
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
        System.out.println(countTypeList);
        Long total = taskService.findNumberOfTasksByUser(id);
        if(countTypeList.isEmpty() && total == 0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        for(CountType i: countTypeList){
            double Percentage = i.getCount() * 100L;
            System.out.println();
            i.setCount(Math.round(Percentage / total));
        }
        System.out.println(countTypeList);
        return ResponseEntity.ok().body(countTypeList);
    }


    //Create a Task
    @PostMapping("/tasks")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    //Return number of tasks
    @GetMapping("/tasks/number")
    public ResponseEntity<Long> getAll() {
        Long number = taskService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(number);
    }

    @GetMapping("/tasks/number/overdue")
    public ResponseEntity<Long> getOverdueTasks() {
        Long number = taskService.findOverdueTasks();
        return ResponseEntity.status(HttpStatus.OK).body(number);
    }
    
    //update Task
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

    @GetMapping("/tasks/report")
    public void generatePdfFile(HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());
        String headerkey = "Content-Disposition";
        String headervalue = "attachment; filename=tasks" + currentDateTime + ".pdf";
        response.setHeader(headerkey, headervalue);
        List <CountType> listofStatus = taskService.listTasksGroupedByStatus();
        PdfGenerator generator = new PdfGenerator();
        generator.generate(listofStatus, response);
    }
}

