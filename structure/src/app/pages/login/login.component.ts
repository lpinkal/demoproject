import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name : new FormControl(''),
    password : new FormControl('')
  });
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).then((res) => {
      console.log(res);
    })
  }

}
