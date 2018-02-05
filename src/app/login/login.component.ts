import {Component, OnInit, Output} from '@angular/core';
import {ServerService} from "../server.service";
import { Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() session:string;
  constructor(private serverservice:ServerService,private router:Router,private authservice:AuthService) { }

  ngOnInit() {
  }
  onlogin(f:NgForm){
    this.authservice.login(f.value).subscribe( (res: any) => {
        //console.log(response);
        // console.log(JSON.parse(response._body).message);
        // let res = JSON.parse(response._body).message;
      console.log(res);
        if (res) {
          this.session=f.value.username;
          console.log('session'+this.session);
          this.router.navigate(['profile']);
    }
        else{
          f.resetForm();
          this.router.navigate(['login']);
        }
      },
      (err) => {
        console.log('err');
        this.router.navigate(['login']);
      })
  }

  googlelogin1(f:NgForm){
    // alert('google ');
    console.log('dfvgr');
    this.serverservice.googlelogin(f.value).subscribe((response:any)=>{
      console.log(JSON.parse(response._body));
    })
  }
}
