import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import {environment} from "./environment";
import 'rxjs/Rx';
@Injectable()
export class ServerService {
  constructor(private http: Http) {
  }

  storedata(value: any) {
    console.log('storedata');
    return this.http.post(environment.baseURL+'post', {value},{withCredentials: true}).map(
      (response:any)=>{
        console.log("Response object register : ",response);
        return response;
      }
    );
  }
  login(body){
    console.log('login');
    return this.http.post(environment.baseURL+'login',{"username":body.username,"password":body.password},{withCredentials: true}).map(
      (response:any)=>{
        return response;
      }
    );
    // return this.http.get('http://localhost:3000/login').map(
    //   (response:any)=>{
    //     const data=response.json();
    //     return data;
    //   });
  }

  googlelogin(body){
    console.log('google');
    // return this.http.get(
    //   'http://localhost:3000/google');
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     document.getElementById("demo").innerHTML = this.responseText;
    //   }
    // };
    // xhttp.open("POST", "http://localhost:3000/google", true);
    // //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.send();

    window.open(environment.baseURL+'google');
    return body;
  }

  display(name){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    return this.http.post(environment.baseURL+'profile',{name:name,user:name},{withCredentials: true,headers:headers}).map(
      (response:any)=>{
        return response.json();
      }
    );
  }

  editpsw(psw){
    console.log('editsave service');
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'edit',{psw:psw,user:user},{withCredentials: true,headers:headers}).map(
      (response:any)=>{
        return response.json();
      }
    );
  }
  delete(user){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
        return this.http.post(environment.baseURL+'delete',{user:user},{withCredentials: true,headers:headers}).map(
          (res:any)=>{
            return res;
          }
        )
  }

  poststudent(body){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'studentpost',{body:body,user:user},{withCredentials: true,headers:headers}).map(
      (res:any)=>{
        return res.json();
      }
    )
  }

  displaystudent(){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'displaystudent',{user:user},{withCredentials: true,headers:headers}).map((res)=>{
      return res.json();
    })
  }

  deletestudent(email){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'deletestudent',{email:email,user:user},{withCredentials: true,headers:headers}).map((res)=>{
      return res.json();
    })
  }

  updatestudent(email){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'updatestudent',{email:email,user:user},{withCredentials: true,headers:headers}).map((res)=>{
      return res.json();
    })
  }
  saveupdate(body,email){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'saveupdate',{value:body,email:email,user:user},{withCredentials: true,headers:headers}).map((res)=>{
      return res.json();
    })
  }

  logout(){
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    const user=localStorage.getItem('user');
    return this.http.post(environment.baseURL+'logout',{user:user},{withCredentials: true,headers:headers}).map((res)=>{
      return res.json();
    })
  }

  upload(formdata){
    console.log(formdata);
    let headers=new Headers({'acesstoken':localStorage.getItem('acesstoken')});
    return this.http.post(environment.baseURL+'upload',formdata,{withCredentials:true,headers:headers}).map((res)=>{
      return res.json();
    })
  }
}
