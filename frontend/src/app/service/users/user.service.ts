import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../../interface/user";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Task} from "../../interface/task";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  user!: User | null;
  constructor(private http: HttpClient, private cookieService: CookieService) {}


  loginUser(value: {email: string, password: string}): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.apiUrl}/users/login`, value, {observe: "response"});
  }

  getNumberOfUsers(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/users/number`)
  }

  signUpUser(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.apiUrl}/users/createUser`, user, {observe: "response"});
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/users`)
  }

}
