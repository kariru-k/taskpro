import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../interface/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  user!: User
  constructor(private http: HttpClient) {}

  setUser(user: User){
    sessionStorage.setItem('user', user.id.toString())
    this.user = user
  }

  getUser(){
    return this.user
  }

  loginUser(value: {email: string, password: string}): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/users/login`, value);
  }


}
