import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const Login_ROUTE = [
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Login_ROUTE),
    SharedModule
  ]
})
export class LoginModule { }
