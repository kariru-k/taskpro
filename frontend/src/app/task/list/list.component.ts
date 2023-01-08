import {Component, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {UserService} from "../../service/users/user.service";
import {TaskService} from "../../service/tasks/task.service";
import {Task} from "../../interface/task";
import {LocalstorageService} from "../../service/localStorage/localstorage.service";
import {Observable, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  tasks!: Observable<Task[]>;
  private unsub = new Subject();
  user!: User | null

  constructor(private userService: UserService, private taskService: TaskService, private localStorageService: LocalstorageService, private router: Router) {
    this.user = this.localStorageService.getItem("user");
  }

  ngOnInit() {
    timer(0, 15000).pipe(
      tap((x) => console.log(x)),
      takeUntil(this.unsub),
      switchMap(() => this.getTasks())
    ).subscribe();

  }

  getTasks() {
    this.tasks = this.taskService.getTasksByUser(this.user);
    return this.tasks
  }

  onClick() {
    this.router.navigateByUrl('/add')
  }

}
