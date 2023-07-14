import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
 token:any;
 refreshToken:any;
 headers_object :any;
  constructor(private http: HttpClient) {
  
  }
  getAllSites(){
    this.token = sessionStorage.getItem('access-token'); 
  
   this.headers_object = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token
    );
    const options = {
      headers: this.headers_object,
    }
    return this.http.get(environment.url + 'user'
      , options);
  }
  addSiteDetails(
    url: any,
    siteName: any,
    sector: any,
    userName: any,
    sitePassword: any,
    notes: any
  ) {
    
    const body = {
      url: url,
      siteName: siteName,
      sector: sector,
      userName: userName,
      sitePassword: sitePassword,
      notes: notes,
    };
    this.token = sessionStorage.getItem('access-token'); 
  
    this.headers_object = new HttpHeaders().set(
       'Authorization',
       'Bearer ' + this.token
     );
     const options = {
       headers: this.headers_object,
     }
    return this.http.post(environment.url + 'user/add-site', body, options);
  }

  editSiteDetails(
    url: any,
    siteName: any,
    sector: any,
    userName: any,
    sitePassword: any,
    notes: any
  ) {
    
    const body = {
      url: url,
      siteName: siteName,
      sector: sector,
      userName: userName,
      sitePassword: sitePassword,
      notes: notes,
    };
    this.token = sessionStorage.getItem('access-token'); 
  
    this.headers_object = new HttpHeaders().set(
       'Authorization',
       'Bearer ' + this.token
     );
     const options = {
       headers: this.headers_object,
     }
    return this.http.patch(environment.url + 'sites/1', body, options);
  }
}
