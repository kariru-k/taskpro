import {Component, OnInit} from '@angular/core';
import {User} from "../interface/user";
import {LocalstorageService} from "../service/localStorage/localstorage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../interface/task";
import {TaskService} from "../service/tasks/task.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  user!: User;
  taskForm!: FormGroup;

  constructor(private localStorageService: LocalstorageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<AddComponent>

) {
    this.user = this.localStorageService.getItem('user');
  }

  ngOnInit(): void {
    //Define the form values
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  //Submission of form
  onSubmit(){

    //Add values from form to variable
    const task: Task = {
      title: this.taskForm.value['title'],
      status: "TODO",
      dueDate: this.taskForm.value['dueDate'],
      description: this.taskForm.value['description'],
      createdOn: new Date(),
      createdBy: this.user
    }

    //HTTP post call to create task in database
    this.taskService.addTask(task).subscribe(
      response => {
        //Successful creation of task
        if (response.status == 201){
          this.toastr.success("Success! You have added a new task")
          this.dialogRef.close();
        }
        },
      //Error in task creation
      error => {
      this.toastr.error("Oops. We couldn't process your task. Please try again")
      }
      );
  }
}
