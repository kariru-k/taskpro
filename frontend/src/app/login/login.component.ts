import { Component } from '@angular/core';
import {UserService} from "../service/users/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  onSubmit(value: {email: string, password: string}) {

    this.userService.loginUser(value).subscribe(
      (response) => {
        if (response.role == 'ADMIN'){
          this.router.navigateByUrl('/admin')
          this.toastr.success("Success! Welcome Back!")
        } else {
          this.router.navigateByUrl('/user')
          this.toastr.success("Success! Welcome Back!")
        }
      },
      (error: any) => {
        this.toastr.error("Oops! You may Have the Wrong credentials!")
      },
      () => console.log("Sewwwyyyy")
    )
  }


}
