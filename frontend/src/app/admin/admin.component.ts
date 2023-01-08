import { Component } from '@angular/core';
import {User} from "../interface/user";
import {LocalstorageService} from "../service/localStorage/localstorage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  user!: User | null

  constructor(private localStorageService: LocalstorageService) {
    this.user = this.localStorageService.getItem('user');
  }
}
