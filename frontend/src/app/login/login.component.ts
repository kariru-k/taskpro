import { Component } from '@angular/core';
import {UserService} from "../service/users/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../interface/user";
import {LocalstorageService} from "../service/localStorage/localstorage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private localStorageService: LocalstorageService
  ) {}

  //Login function
  onSubmit(value: {email: string, password: string}) {

    //Calls user login API from the service
    this.userService.loginUser(value).subscribe(

      //Successful action
      (response) => {

        //Stores user details in local storage
        this.localStorageService.setItem('user', response.body);

        //If admin go to admin page
        if (response.body?.role == 'ADMIN'){
          this.router.navigateByUrl('/admin').then(r => this.toastr.success("Success! Welcome Back!"))
        }
        //Go to user page if user
        else {
          this.router.navigateByUrl('/user').then(r => this.toastr.success("Success! Welcome Back!"))
        }
      },

      //Else if there's an error
      (error: any) => {
        this.toastr.error("Oops! You may Have the Wrong credentials!")
      },

    )
  }


}
