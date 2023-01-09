import {Component, OnInit} from '@angular/core';
import {User} from "../interface/user";
import {LocalstorageService} from "../service/localStorage/localstorage.service";
import {UserService} from "../service/users/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  user!: User | null
  employees!: number

  constructor(private localStorageService: LocalstorageService, private userService: UserService) {
    this.user = this.localStorageService.getItem('user');
  }

  ngOnInit() {
    this.getNumberOfUsers();
  }


  getNumberOfUsers(){
    this.userService.getNumberOfUsers().subscribe(
      (response) =>{
        this.employees = response;
        console.log(response);
      }
    );
    return this.employees;
  }
}
