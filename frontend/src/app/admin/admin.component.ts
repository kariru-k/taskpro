import {Component, OnInit} from '@angular/core';
import {User} from "../interface/user";
import {LocalstorageService} from "../service/localStorage/localstorage.service";
import {UserService} from "../service/users/user.service";
import {TaskService} from "../service/tasks/task.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  user!: User | null
  employees!: number
  tasks!: number
  overdueTasks!: number


  constructor(private localStorageService: LocalstorageService, private userService: UserService, private taskService: TaskService) {
    this.user = this.localStorageService.getItem('user');
  }

  ngOnInit() {
    this.getNumberOfUsers();
    this.getAllTasks();
    this.getAllOverdueTasks();
  }


  getNumberOfUsers(){
    this.userService.getNumberOfUsers().subscribe(
      (response) =>{
        this.employees = response;
        console.log(response);
      }
    );
    return this.employees;
  }

  getAllTasks() {
    this.taskService.getNumberOfTasks().subscribe(
      (response) =>{
        this.tasks = response;
        console.log(response);
      }
    );
    return this.tasks;
  }

  getAllOverdueTasks() {
    this.taskService.getNumberOfOverdueTasks().subscribe(
      (response) =>{
        this.overdueTasks = response;
      }
    );
    return this.tasks;
  }
}
