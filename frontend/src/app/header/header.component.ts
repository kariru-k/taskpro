import { Component } from '@angular/core';
import {User} from "../interface/user";
import {LocalstorageService} from "../service/localStorage/localstorage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user!: User

  constructor(private localStorage: LocalstorageService) {
    this.user = this.localStorage.getItem('user')
  }

}
