import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonURL } from 'src/services/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username="";
  IsAdmin=0;
  email ="";
  fname: BehaviorSubject<any>;
  IsAdm: BehaviorSubject<any>;
  userId:BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    this.fname  = new BehaviorSubject(this.username),
    this.IsAdm  = new BehaviorSubject(this.IsAdmin),
    this.userId  = new BehaviorSubject(this.email)

  }
  // setuser(username:any,IsAdmin:any, email:any) {
  //   this.fname = username;
  //   this.IsAdm = IsAdmin;
  //   this.userId = email;
  //   //console.log(this.IsAdm);
  // }
  
  // getuser() {
  //   return this.fname;
    
  // }
  setuser(username:any,IsAdmin:any, email:any) {

    localStorage.setItem("fname",username);
    localStorage.setItem("IsAdmin",IsAdmin);
    localStorage.setItem("email",email);
    
    this.fname = username;
    this.IsAdm = IsAdmin;
    this.userId = email;
    //console.log("user service email = " + this.userId);
  }
  
  getuser() {
    return localStorage.getItem("fname");

    //return this.fname;
    
  }
  getuserId() {
    // return this.userId;
    return  localStorage.getItem("email");
    
  }
  getuserType() {
    //console.log(this.IsAdm);
    //return this.IsAdm;
    return localStorage.getItem("IsAdmin");
  }
  getUsers()
  {   
    return this.http.get(`${CommonURL.BASE_URL}/users`)
    //return this.http.get("http://localhost:5000/users")

  }

  getSingleUser(id:any)
  {   
    return this.http.get(`${CommonURL.BASE_URL}/users`+id);

    //return this.http.get("http://localhost:5000/users/"+id);
  }

  editUser(id:any, user:any)
  {   
    console.log("Edituser Service editUser Fun=  "+id,user);
    return this.http.post(`${CommonURL.BASE_URL}/edituser/`+id,{"user":user}); 
    //return this.http.post("http://localhost:5000/edituser/"+id,{"user":user});
    //return this.http.post<any>("http://localhost:5000/edituser/"+id,{"user":item});
  }  
  getUserStatus() {
    //console.log(this.IsAdm);
    return this.IsAdm;
  }

  
}