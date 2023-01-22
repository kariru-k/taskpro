import {Component, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {UserService} from "../../service/users/user.service";
import {TaskService} from "../../service/tasks/task.service";
import {Task} from "../../interface/task";
import {LocalstorageService} from "../../service/localStorage/localstorage.service";
import {Observable, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UpdateComponent} from "../update/update.component";
import {Status} from "../../interface/Status";
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
    timer(0, 10000).pipe(
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
    const dialogRef = this.dialog.open(AddComponent, {
      width: '1000px',
    });
  }

  onUpdateDialog(task: Task) {
    console.log(task);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1000px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed')
    })
  }

  onDeleteTask(task: Task) {
    this.taskService.deleteTask(<number>task.id).subscribe(
      response => {
        console.log(response);
        this.toastr.success("Task Deleted Successfully");
      },
      error => {
        this.toastr.error(error);
      }
    )
  }

}
