import { Injectable } from '@angular/core';
import { HttpClient ,HttpBackend, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { StratpnlService } from "src/services/stratpnl.service";
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _stratPnlService:StratpnlService ,private http:HttpClient, private router: Router,private socialAuthService: SocialAuthService) { };
  
  loggedIn()
  {
    const token = localStorage.getItem('token');
    // console.log("logged in");
    // console.log(token);
    return !!token;
  }
  gettoken()
  {
    console.log("token returned");
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  logOut()
  {
    console.log("logout");
    this._stratPnlService.exitStrategy()
    .subscribe((res) => {
      console.log(res);
      
    })
    alert("All running strategy positions are exited");
    this.socialAuthService.signOut();

    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    localStorage.removeItem("IsAdmin");
    localStorage.removeItem("email");
    this.router.navigate(["/login"]);

    
  }
}
