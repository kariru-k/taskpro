import { Component } from '@angular/core';
import {User} from "../interface/user";
import {UserService} from "../service/users/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  user!: User

  constructor(private userService: UserService) {
    this.user = userService.getUser();
  }
}
