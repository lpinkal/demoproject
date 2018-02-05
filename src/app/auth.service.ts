import {Injectable, OnInit} from "@angular/core";
import {ServerService} from "./server.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService{
  loggedin=false;
  constructor(private serverservic:ServerService,private router:Router){
    const token = localStorage.getItem('token');
    if (token) {
      console.log('auth');
      this.loggedin=true;
    }
  }


  login(body){
    return this.serverservic.login(body).map(
      res=>{
        console.log(res);
        if(res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.user);
          this.loggedin = true;
        }
        return res;
      },
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedin=false;
    this.router.navigate(['/home']);
  }

}
