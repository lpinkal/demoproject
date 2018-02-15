import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {NgModule} from "@angular/core";
import {LogoutComponent} from "./logout/logout.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {StudentdetailsComponent} from "./studentdetails/studentdetails.component";
import {AuthGuard} from "./auth-gaurd.service";
import {ErrorpageComponent} from "./errorpage/errorpage.component";

const approutes:Routes=[
  {path:'',component:HomeComponent },
  {path:'home',component:HomeComponent },
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'student',component:StudentdetailsComponent,canActivate:[AuthGuard]},
  {path:'not-found', component:ErrorpageComponent, data:{message:'page not found'}},
  {path:'**', redirectTo:'not-found'}
  ];
@NgModule({
  imports:[
    RouterModule.forRoot(approutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule{

}
