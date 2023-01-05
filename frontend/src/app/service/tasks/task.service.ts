import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../interface/user";
import {map, Observable} from "rxjs";
import {Task} from "../../interface/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}


  getTasksByUser(user: User): Observable<Array<Task>>{
    return this.httpClient
      .get<Array<Task>>(`${this.apiUrl}/tasks/users/${user.id}`)
      .pipe(map((data: Array<Task>) => data))
  }


}
