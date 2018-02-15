import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServerService} from "./server.service";
import {HttpModule} from "@angular/http";
import {AuthService} from "./auth.service";
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import {RoutingModule} from "../../../test1/src/app/routing.module";
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { DisplaystudentComponent } from './displaystudent/displaystudent.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {AuthGuard} from "./auth-gaurd.service";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    HomeComponent,
    StudentdetailsComponent,
    DisplaystudentComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ServerService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
