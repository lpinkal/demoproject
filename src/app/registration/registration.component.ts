import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {
  genders=['male','female'];
  constructor(private router:Router,private serverservice:ServerService) { }

  onsave(f:NgForm) {
    console.log(f.value);
    this.serverservice.storedata(f.value).subscribe(
      (response: any) => {
        console.log(JSON.parse(response._body).message);
        let res = JSON.parse(response._body).message;
        if (res === 'sucess') {
          this.router.navigate(['profile']);
        }
        else{
          f.reset();
          this.router.navigate(['registration']);
        }
      },
      (err) => {
        this.router.navigate(['registration']);
      }
    );
  }
}
