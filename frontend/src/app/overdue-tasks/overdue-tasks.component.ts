import {Component, OnInit} from '@angular/core';
import {Task} from "../interface/task";
import {TaskService} from "../service/tasks/task.service";

@Component({
  selector: 'app-overdue-tasks',
  templateUrl: './overdue-tasks.component.html',
  styleUrls: ['./overdue-tasks.component.css']
})
export class OverdueTasksComponent implements OnInit{
  tasks!: Task[];
  displayedColumns: string[] = ['Id', 'title', 'description', 'status', 'dueDate', 'createdBy'];

  constructor(private taskService: TaskService) {

  }

  //Gets all overdue tasks
  getAllOverdueTasks() {
    return this.taskService.getOverdueTasks().subscribe(
      (response) => {
        this.tasks = response;
      }
    )
  }

  ngOnInit(): void {
    this.getAllOverdueTasks();
  }
}
