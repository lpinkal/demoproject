import {Injectable, OnInit} from "@angular/core";
import {ServerService} from "./server.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService{
  loggedin=false;
  constructor(private serverservic:ServerService,private router:Router){
    const user = localStorage.getItem('user');
    if (user) {
      console.log('auth');
      this.loggedin=true;
    }
  }

  isauthenticated(){
    let promise=new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.loggedin);
      },800);
    });
    return promise;
  }


  login(body){
    return this.serverservic.login(body).map(
      res=>{
        let b=res.headers._headers.get('acesstoken');
        console.log(b[0]);
        let x=res.json();
        if(x.user) {
          localStorage.setItem('user', x.user);
          localStorage.setItem('acesstoken',b[0]);
          this.loggedin = true;
        }
      },
    );
  }

  logout(){
    // return this.serverservic.logout().map(res=>{
    //   console.log(res);
      localStorage.removeItem('user');
      localStorage.removeItem('acesstoken');
      this.loggedin=false;
      this.router.navigate(['/home']);
    //   return res;
    // });
  }

  storedata(body){
    return this.serverservic.storedata(body).map((res:any)=>{
      let b=res.headers._headers.get('acesstoken');
      let x=res.json();
      if(x.user) {
        localStorage.setItem('user', x.user);
        localStorage.setItem('acesstoken',b[0]);
        this.loggedin = true;
      }
      return res;
    })
  }

}
