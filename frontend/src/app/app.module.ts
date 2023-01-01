import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  providers: [
    CookieService
  ]
})
export class AppModule { }
