import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";

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
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminComponent, UserComponent, LoginComponent]
