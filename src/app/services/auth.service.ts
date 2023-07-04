import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  createUser(email:any,password:any){

    const body = {
      "email" : email,
      "password": password
    }

    return this.http.post(environment.url +'auth/register',body);
  }
  userLogin(email:any,password:any){

    const body = {
      "email" : email,
      "password": password
    }

    return this.http.post(environment.url +'auth/authenticate',body);
  }
  refreshToken(){
    var token = sessionStorage.getItem('refresh-token'); 
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const options = {
      headers: headers_object,
    }
    return this.http.post(environment.url +'auth/refresh-token',{},options);
  }
  logout(){
    var token = sessionStorage.getItem('access-token'); 
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const options = {
      headers: headers_object,
    }
    return this.http.post(environment.url +'auth/logout',{},options);
  }
}
