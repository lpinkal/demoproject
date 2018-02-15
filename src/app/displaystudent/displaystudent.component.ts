import {ServerService} from "../server.service";
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-displaystudent',
  templateUrl: './displaystudent.component.html',
  styleUrls: ['./displaystudent.component.css']
})
export class DisplaystudentComponent{
  students=[];
  constructor(private serverservice:ServerService,private router:Router) {

  }

}
