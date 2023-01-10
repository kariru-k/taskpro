import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
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

  getTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(`${this.apiUrl}/tasks`)
  }

  getOverdueTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(`${this.apiUrl}/tasks/overdue`)
  }

  getNumberOfTasks(): Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/tasks/number`);
  }

  getNumberOfOverdueTasks(): Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/tasks/number/overdue`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient
      .get<Task>(`http://localhost:8080/api/v1/tasks/${id}`)
      .pipe(map((d: Task) => d));
  }

  getTasksByUser(user: User | null): Observable<Array<Task>>{
    return this.httpClient
      .get<Array<Task>>(`${this.apiUrl}/tasks/users/${user?.id}`)
  }

  getPercentageTasksByUser(user: User | null): Observable<Array<CountResponse>>{
    return this.httpClient.get<Array<CountResponse>>(`${this.apiUrl}/tasks/users/percentages/${user?.id}`)
  }

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

  updateTask(task: Task, id: number): Observable<Task> {
    return this.httpClient.put<Task>(`http://localhost:8080/api/v1/tasks/${id}`, task)
      .pipe(map((d: Task) => d));
  }

  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/api/v1/tasks/${id}`)
  }




}
