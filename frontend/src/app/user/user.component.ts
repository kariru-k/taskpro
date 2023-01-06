import { Component } from '@angular/core';
import {ChartData, ChartOptions, ChartType} from "chart.js";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartData: ChartData = {
    labels: ['one', 'two', 'three'],
    datasets: [
      {
        label: 'data 1',
        data: [350, 450, 100]
      },
      {
        label: 'data 2',
        data: [350, 450, 100]
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public typeData = [];


}
