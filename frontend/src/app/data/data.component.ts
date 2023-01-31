import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CountResponse} from "../interface/CountResponse";
import {UserService} from "../service/users/user.service";
import {TaskService} from "../service/tasks/task.service";
import {LocalstorageService} from "../service/localStorage/localstorage.service";
import {User} from "../interface/user";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{

  user!: User;
  response!: Observable<CountResponse[]>




  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private localStorageService: LocalstorageService
  ) {
    this.user = this.localStorageService.getItem("user");
  }

  //Get responses of percentages of task status
  getPercentageTasks(){
    this.response = this.taskService.getPercentageTasksByUser(this.user);
    return this.response;
  }

  ngOnInit(): void {
    this.getPercentageTasks();
  }

}
