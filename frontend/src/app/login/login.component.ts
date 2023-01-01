import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private http: HttpClient) {}

  onSubmit(value: {email: string, password: string}) {
    console.log(value);
    this.http.post("http://localhost:8080/users/login", value).subscribe(res =>
      console.log(res)
    )
  }


}
