import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ToastrModule} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import {MatListModule} from "@angular/material/list";
import { ChartComponent } from './chart/chart.component';
import {MatCardModule} from "@angular/material/card";
import { AddComponent } from './add/add.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { OverdueTasksComponent } from './lists/overdue-tasks/overdue-tasks.component';
import { UpdateComponent } from './update/update.component';
import {MatDialogModule} from "@angular/material/dialog";
import { RegistrationComponent } from './registration/registration.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ListusersComponent } from './lists/listusers/listusers.component';
import { ListtasksComponent } from './lists/listtasks/listtasks.component';
import {MatTableModule} from "@angular/material/table";
import { DataComponent } from './data/data.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    ListComponent,
    HeaderComponent,
    ChartComponent,
    AddComponent,
    CreateEmployeeComponent,
    OverdueTasksComponent,
    UpdateComponent,
    RegistrationComponent,
    SidenavComponent,
    ListusersComponent,
    ListtasksComponent,
    DataComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    NgChartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    CookieService
  ]
})
export class AppModule { }
