import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ServerService} from "../server.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {
  genders=['male','female'];
  log:boolean=true;
  constructor(private router:Router,private serverservice:ServerService,private auth:AuthService) { }

  onsave(f:NgForm) {
    console.log(f.value);
    this.auth.storedata(f.value).subscribe(
      (response: any) => {
        let token=localStorage.getItem('token');
        console.log(token);
        if (token) {
          f.resetForm();
          this.router.navigate(['profile']);
        }
        else{
          f.reset();
          this.log=false;
          this.router.navigate(['registration']);
        }
      },
      (err) => {
        this.log=false;
        this.router.navigate(['registration']);
      }
    );
  }
}
