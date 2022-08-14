import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { LoginperformedService } from 'src/services/loginperformed.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { SocialAuthServiceConfig, SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {GoogleLoginProvider } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: SocialUser;
  loggedIn?: boolean;
   constructor( private userService: UserService, public _auth: AuthService, private _login:LoginperformedService, private _loginForm: UntypedFormBuilder, private router:Router, private socialAuthService: SocialAuthService) { }
  loginForm = this._loginForm.group({
    email: ["",[Validators.required, Validators.pattern("^([a-zA-Z0-9\-\._]+)@([A-Za-z\-]+)\.([a-z]{2,3}(\.[a-z]{2,3})?)$")]],
    pwd: ["",[Validators.required,Validators.minLength(8)]]
  });
  
  
  ngOnInit(): void {
    try{
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user.name);
      console.log(user.email);
      const name = user.name;
      const email = user.email;
      const item = {
        name,
        email
      }
      this._login.googleLogin(item)
    .subscribe((data:any) => {
      let status = data.status;

      if(!status)      
      {
        alert("Incorrect Username/Password");
      }
      else
      {
        localStorage.setItem("token",data.token)
        console.log("token set");
        console.log(data.token)
        console.log(data.fname);
	      this.userService.setuser(data.fname,data.isAdmin,data.email);
	      this.router.navigate(["/home"]);
    
      }

    })

    });
  }
  catch(e) {
    console.log(e);
  }
  }
  
 
  

  login()
  {    
    const email = this.loginForm.controls['email'].value;
    const pwd = this.loginForm.controls['pwd'].value;

    const item = {
      email,
      pwd
    }

    console.log("Service Called");    
    console.log(item);
    this._login.login(item)
    .subscribe((data) => {
      let status = data.status;
      let blockstatus = data.blockstatus; // Blockuser Checking
//      if(!status)
      if(!status  && blockstatus==0)
      {
        alert("Incorrect Username/Password");
      }
      else if(!status && blockstatus==1) // For Block User Checking
      {
        alert("User Is Blocked");
      }
      else if(!status ) // New
      {
        alert("Incorrect Username/Password");
      }
      else
      {
        localStorage.setItem("token",data.token)
        console.log("token set");
        console.log(data.token)
        console.log(data.fname);
	      this.userService.setuser(data.fname,data.isAdmin,data.email);
        //this.userService.setuser(data.isAdmin);
	      this.router.navigate(["/home"]);
        // if (data.isAdmin==0)
        // {
        //   this.router.navigate(["/books"]);
        // }
        // else
        // {
        //   this.router.navigate(["/home"]);
        // }
      }

    })

  }
}