import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ServerService} from "../server.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private serverservice:ServerService,private el:ElementRef,private auth:AuthService,private router:Router) { }
  username='';
  email='';
  psw='';
  gender='';
  editmode=false;
  user='';

  ngOnInit() {
    this.user=localStorage.getItem('user');
    console.log('user');
    console.log(this.user);
    this.serverservice.display(this.user).subscribe((res:any)=>{
      console.log(res.name);
      this.username=res.name;
      this.email=res.email;
      this.psw=res.password;
      this.gender=res.gender;
    },(err)=>{

    })
  }

  edit(){
    console.log('edit');
    this.editmode=true;
    let p=this.el.nativeElement.querySelector('#psw');
    p.innerHTML=`<input type="text" id="npsw" value=${this.psw}>`;
    console.log();
    //p.appendChild(ie)

  }
  save(){
    console.log('save');
    let q=this.el.nativeElement.querySelector('#npsw').value;
    this.serverservice.editpsw(q).subscribe((res:any)=>{
      this.psw=q;
      console.log(res);
    });

    let p=this.el.nativeElement.querySelector('#psw');
    p.innerHTML=`${q}`;
     this.editmode=false;
  }

  delete(){

    this.serverservice.delete(this.user).subscribe((res:any)=>{
      console.log(res);
      localStorage.removeItem('acesstoken');
      localStorage.removeItem('user');
      this.auth.loggedin=false;
      this.router.navigate(['/home']);
    });
  }

}
