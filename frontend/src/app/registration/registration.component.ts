import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/users/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from '../interface/user';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
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

  constructor(private authService: UserService,private formBuilder: FormBuilder,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
      firstName: ['',Validators.required],
      lastName : ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['', [Validators.required]]
      },
      {
        validator: this.ConfirmedValidator('Password', 'confirmPassword'),
      }
    );
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
        this.router.navigateByUrl('')
        this.toastr.success("Success! You have succesfully signed up!")
      },
      (error: any) => {
        this.toastr.error("Oops! You may Have entered the Wrong credentials!")
      },
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
