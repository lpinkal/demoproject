import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {NgModule} from "@angular/core";
import {LogoutComponent} from "./logout/logout.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";

const approutes:Routes=[
  {path:'home',component:HomeComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path:'profile',component:ProfileComponent}
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
