import {Component, OnInit} from '@angular/core';
import {User} from "../interface/user";
import {UserService} from "../service/users/user.service";
import {TaskService} from "../service/tasks/task.service";
import {Task} from "../interface/task";
import {LocalstorageService} from "../service/localStorage/localstorage.service";
import {Observable, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UpdateComponent} from "../update/update.component";
import {ToastrService} from "ngx-toastr";
import {AddComponent} from "../add/add.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  tasks!: Observable<Task[]>;
  private unsub = new Subject();
  user!: User | null



  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private localStorageService: LocalstorageService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.user = this.localStorageService.getItem("user");
  }

  ngOnInit() {
    //Refreshes the page to show new tasks every ten seconds
    timer(0, 10000).pipe(
      tap((x) => console.log(x)),
      takeUntil(this.unsub),
      switchMap(() => this.getTasks())
    ).subscribe();

  }

  //Getting the user's tasks
  getTasks() {
    this.tasks = this.taskService.getTasksByUser(this.user);
    return this.tasks
  }

  //Open create task dialog box
  onClick() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '1000px',
    });
  }

  //Open update task dialog box
  onUpdateDialog(task: Task) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1000px',
      data: task,
    });
  }

  //Delete a task
  onDeleteTask(task: Task) {
    this.taskService.deleteTask(<number>task.id).subscribe(
      response => {
        this.toastr.success("Task Deleted Successfully");
      },
      error => {
        this.toastr.error(error);
      }
    )
  }
}
