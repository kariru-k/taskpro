import {Component, OnInit} from '@angular/core';
import {Task} from "../../interface/task";
import {TaskService} from "../../service/tasks/task.service";

@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css']
})
export class ListtasksComponent implements OnInit{
  tasks!: Task[];
  displayedColumns: string[] = ['Id', 'title', 'description', 'status', 'dueDate', 'createdBy'];

  constructor(private taskService: TaskService) {

  }
  getAllTasks() {
    return this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      }
    )
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

}
