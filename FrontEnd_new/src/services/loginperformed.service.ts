import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from 'src/services/common';

@Injectable({
  providedIn: 'root'
})
export class LoginperformedService {
   loginPerformed = false;

  constructor(private http: HttpClient) { }
  login(item:any)
  {    
     return this.http.post<any>(`${CommonURL.BASE_URL}/login`,{"login":item})

      //return this.http.post<any>("http://localhost:5000/login",{"login":item})

  }
  googleLogin(item:any)
  {    
    return this.http.post<any>(`${CommonURL.BASE_URL}/googlelogin`,{"login":item})

      //return this.http.post<any>("http://localhost:5000/googlelogin",{"login":item})

  }
  
}

