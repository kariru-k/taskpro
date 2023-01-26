import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {AddComponent} from "./task/add/add.component";
import { CreateEmployeeComponent} from './create-employee/create-employee.component';
import { OverdueTasksComponent} from './lists/overdue-tasks/overdue-tasks.component';
import { RegistrationComponent } from './registration/registration.component';
import {ListusersComponent} from "./lists/listusers/listusers.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'createemployee',
    component: CreateEmployeeComponent
  },
  {
    path: 'overduetasks',
    component: OverdueTasksComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'list/listUsers',
    component: ListusersComponent
  },
  {
    path: 'list/listTasks',
    component: ListtasksComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminComponent, UserComponent, LoginComponent, AddComponent]
