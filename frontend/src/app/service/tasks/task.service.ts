import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../interface/user";
import {concatMap, map, Observable, startWith, Subject} from "rxjs";
import {Task} from "../../interface/task";
import {CountResponse} from "../../interface/CountResponse";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  private _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }



  getTasksByUser(user: User | null): Observable<Array<Task>>{
    return this.httpClient
      .get<Array<Task>>(`${this.apiUrl}/tasks/users/${user?.id}`)
  }

  getPercentageTasksByUser(user: User | null): Observable<Array<CountResponse>>{
    return this.httpClient.get<Array<CountResponse>>(`${this.apiUrl}/tasks/users/percentages/${user?.id}`)
  }


}
