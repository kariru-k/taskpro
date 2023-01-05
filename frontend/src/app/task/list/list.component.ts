import {Component, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {UserService} from "../../service/users/user.service";
import {TaskService} from "../../service/tasks/task.service";
import {Task} from "../../interface/task";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  tasks:Task[] = [];
  user!: User

  constructor(private userService: UserService, private taskService: TaskService) {
    this.user = this.userService.getUser()
  }

  ngOnInit() {
    this.getTasks()
  }

  getTasks() {
    this.taskService.getTasksByUser(this.user).subscribe(response => {
      for (let value of response) {
        this.tasks.push(value);
      }
      console.log(this.tasks);
    })
  }

}
