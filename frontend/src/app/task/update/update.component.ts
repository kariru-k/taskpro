import {Component, Inject, OnInit} from '@angular/core';
import {Status} from "../../interface/Status";
import {TaskService} from "../../service/tasks/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../interface/task";
import {User} from "../../interface/user";
import {LocalstorageService} from "../../service/localStorage/localstorage.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  taskForm!: FormGroup;
  user: User;
  typeOptions: Array<Status> = [];

  constructor(
    private tasKService: TaskService,
    private fb: FormBuilder,
    private localStorageService: LocalstorageService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  )
  {
    this.user = this.localStorageService.getItem('user');
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.typeOptions = this.tasKService.getTypeOptions();

    this.showTask();
  }

  showTask() {
    this.tasKService.getTaskById(<number>this.data.id).subscribe(
      (response:Task) => {
        this.taskForm.controls['title'].setValue(response.title);
        this.taskForm.controls['description'].setValue(response.description);
        this.taskForm.controls['status'].setValue(response.status);
        this.taskForm.controls['dueDate'].setValue(
         new Date(response.dueDate).toISOString()
        );},
      error => console.error(error)
    );
  }

  updateTask() {
    const task: Task = {
      title: this.taskForm.value['title'],
      status: this.taskForm.value['status'],
      dueDate: this.taskForm.value['dueDate'],
      description: this.taskForm.value['description'],
      createdOn: this.data.createdOn,
      createdBy: this.data.createdBy
    }

    this.tasKService.updateTask(task, <number>this.data.id).subscribe(
      (response) =>{
        this.dialogRef.close();
      },
      (error) => console.error(error)
    )
  }

}
