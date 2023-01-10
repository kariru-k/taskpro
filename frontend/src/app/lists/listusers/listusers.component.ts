import {Component, OnInit} from '@angular/core';
import {Task} from "../../interface/task";
import {User} from "../../interface/user";
import {UserService} from "../../service/users/user.service";

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css'],
})
export class ListusersComponent implements OnInit{
  tasks!: User[];
  columns = [
    {
      columnDef: 'Id',
      header: 'ID',
      cell: (element: User) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: User) => `${element.firstName} ${element.lastName}`,
    },
    {
      columnDef: 'email',
      header: 'Email Address',
      cell: (element: User) => `${element.email}`,
    },
    {
      columnDef: 'Role',
      header: 'Role',
      cell: (element: User) => `${element.role}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef)

  constructor(private userService: UserService) {
  }
  getAllUsers() {
    return this.userService.getUsers().subscribe(
      (response) => {
        this.tasks = response;
      }
    )
  }

  onClick(task: any){
    console.log(task);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}
