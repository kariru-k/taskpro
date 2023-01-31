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

//Service for HTTP requests involving users
export class UserService {
  private apiUrl = environment.apiUrl;
  user!: User | null;
  constructor(private http: HttpClient, private cookieService: CookieService) {}


  //API call to login a user
  loginUser(value: {email: string, password: string}): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.apiUrl}/users/login`, value, {observe: "response"});
  }

  //API call to get number of users
  getNumberOfUsers(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/users/number`)
  }

  signUpUser(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.apiUrl}/users/createUser`, user, {observe: "response"});
  }

  //API call to get all users
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/users`)
  }
}
