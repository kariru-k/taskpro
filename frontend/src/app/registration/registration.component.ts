import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/users/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from '../interface/user';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user!: User;
  registerForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
 
  constructor(private authService: UserService,private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName : ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }
 
  onSubmit(){
    const user: User = {
      firstName: this.registerForm.value['firstName'],
      lastName: this.registerForm.value['lastName'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password'],
      role: "USER"
    }
    this.authService.signUpUser(user).subscribe(
      data => {
        // console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
 
}
