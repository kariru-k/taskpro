import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../interface/user";
import {concatMap, map, Observable, startWith, Subject} from "rxjs";
import {Task} from "../../interface/task";
import {CountResponse} from "../../interface/CountResponse";
import {Status} from "../../interface/Status";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  //API call to get list of all tasks
  getTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(`${this.apiUrl}/tasks`)
  }

  //API Call to get all overdue tasks
  getOverdueTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(`${this.apiUrl}/tasks/overdue`)
  }

  //API call to get the number of all tasks
  getNumberOfTasks(): Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/tasks/number`);
  }

  //API call to get number of overdue tasks
  getNumberOfOverdueTasks(): Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/tasks/number/overdue`);
  }

  //Get task by its ID
  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`http://localhost:8080/api/v1/tasks/${id}`).pipe(map((d: Task) => d));
  }

  //Get a task by a specific user
  getTasksByUser(user: User | null): Observable<Array<Task>>{
    return this.httpClient.get<Array<Task>>(`${this.apiUrl}/tasks/users/${user?.id}`)
  }

  //Get the percentage of statuses of all tasks
  getPercentageTasksByUser(user: User | null): Observable<Array<CountResponse>>{
    return this.httpClient.get<Array<CountResponse>>(`${this.apiUrl}/tasks/users/percentages/${user?.id}`)
  }

  //Create a task
  addTask(value: Task): Observable<HttpResponse<Task>>{
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, value, {observe: "response"});
  }

  getTypeOptions(): Array<Status> {
    return [
      { type: 'TODO' },
      { type: 'DEVELOPMENT' },
      { type: 'PEERREVIEW' },
      { type: 'QA' },
      { type: 'DEPLOYMENT' },
      { type: 'RELEASE' },
    ];
  }

  //Updates existing tasks with new details
  updateTask(task: Task, id: number): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/tasks/${id}`, task).pipe(map((d: Task) => d));
  }

  //Delete task
  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/tasks/${id}`)
  }

  //API call to download pdf
  downloadPdf(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    return this.httpClient.get(`${this.apiUrl}/tasks/report`, {
      headers: headers,
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    })
  }


}
