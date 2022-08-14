import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http'
import { CommonURL } from 'src/services/common';

@Injectable({
  providedIn: 'root'
})
export class EdituserService {

  constructor(private http:HttpClient) { }
  
  editUser(id:any, user:any)
  {   
    console.log("Edituser Service editUser Fun=  "+id,user);
    return this.http.post(`${CommonURL.BASE_URL}/edituser/`+id,{"user":user});

    // return this.http.post("http://localhost:5000/edituser/"+id,{"user":user});
    //return this.http.post<any>("http://localhost:5000/edituser/"+id,{"user":item});
  }
}




