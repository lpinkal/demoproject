import {Component, DoCheck, OnChanges, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {Router} from "@angular/router";
// import {DataTable,DataTableResource} from "angular-4-data-table";

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnChanges {
  @ViewChild('f') f:NgForm;
   log:boolean=true;
   edit:boolean=false;
   students=[];
   name='';
   email='';
   password='';
   btns=[];
   response=[];
  // studentcount=0;
  // studentresource=new DataTableResource(this.students);
  //
  // @ViewChild('DataTable') studentsTable:DataTable;

  constructor(private serverservice:ServerService,private router:Router) {
   this.ab();
  }

  ngOnChanges(){
    console.log('change')
  }

  ab(){
    this.serverservice.displaystudent().subscribe((res)=> {
      console.log(res);
      this.response=res;
        this.btns=[];
      for(let i=0;i<res.length;i=i+5){
        this.btns.push(i);
      }

      this.page(0);
      //this.students=res;
    })
  }

  page(btn){
    this.students=[];
    for(let i=btn;i<btn+5&&i<this.response.length;i++){
      this.students.push(this.response[i]);
    }
  }

  poststudent(f:NgForm){
    console.log(f.value);
    //this.students.push(f.value);
    this.serverservice.poststudent(f.value).subscribe((res)=>{
      if(res.message=='err'){
        this.log=false;
      }
      if(res.message=='sucess'){
        f.resetForm();
        this.log=true;
       this.ab();
      }
    });
  }

  updatestudent(email){
    console.log(email);
    this.serverservice.updatestudent(email).subscribe((res)=>{
      console.log(res);
      this.edit=true;
      this.name=res.name;
      this.email=res.email;
      this.password=res.password;
    })
  }

  saveupdate(f){
    console.log(f.value);
    this.serverservice.saveupdate(f.value,this.email).subscribe((res)=>{
      console.log(res);
      f.resetForm();
      this.edit=false;
      this.ab();
    })
  }

  deletestudent(email){
    console.log(email);
    if(this.email==email){
      alert('student is in editing mode');
    }
    else{
    this.serverservice.deletestudent(email).subscribe((res)=>{
      console.log(res);
      this.ab();
    });
    }
  }
}
