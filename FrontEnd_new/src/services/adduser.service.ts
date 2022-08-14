import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http'
import { CommonURL } from 'src/services/common';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

constructor(private http:HttpClient) { }
//addUserService(user:any)
addUserService(item:any)
  {   
    return this.http.post(`${CommonURL.BASE_URL}/users/adduser`,{"user":item});
    //return this.http.post("http://localhost:5000/users/adduser",{"user":item});
    //console.log(item);
    // return this.http.post<any>("http://localhost:5000/signup",{"signup":item})
  }
}



