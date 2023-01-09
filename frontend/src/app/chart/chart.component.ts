import {Component, OnInit} from '@angular/core';
import {Chart, ChartData, ChartOptions, ChartType} from "chart.js";
import {UserService} from "../service/users/user.service";
import {TaskService} from "../service/tasks/task.service";
import {LocalstorageService} from "../service/localStorage/localstorage.service";
import {User} from "../interface/user";
import {Observable, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
import {CountResponse} from "../interface/CountResponse";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  user!: User | null;
  labels: string[] = [];
  data: number[] = [];
  private unsub = new Subject();

  public chart: any;


  response!: Observable<CountResponse[]>




  constructor(private userService: UserService, private taskService: TaskService, private localStorageService: LocalstorageService) {
    this.user = this.localStorageService.getItem("user");
  }



  ngOnInit(): void {
    this.getPercentageTasks();

    timer(0, 15000).pipe(
      tap((x) => console.log(x)),
      takeUntil(this.unsub),
      switchMap(() => this.getPercentageTasks())
    ).subscribe();

    this.updateChartDetails();

    this.createChart();
    this.updateChart();

  }
  getPercentageTasks(){
    this.response = this.taskService.getPercentageTasksByUser(this.user);
    return this.response;
  }

  updateChartDetails(){
    this.getPercentageTasks().subscribe(
      response => {
        response.forEach((value: CountResponse) => {
          this.labels.push(value.status);
          this.data.push(value.count)
          this.chart.update();
        })
      }
    )
  }

  createChart() {
    this.chart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data
          }
        ]
      }
    })
  }

  updateChart(){
    this.chart.update();
  }


}
