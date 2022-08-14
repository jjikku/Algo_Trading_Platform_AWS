import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
    {
      _id:Number,
      fname: String,
      lname:String,
      email:String,
      isAdmin:Number
    }
  ]
  constructor(private userservice: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userservice.getUsers()
    .subscribe((data) => {
      if(data instanceof HttpErrorResponse)
      {
        if(data.status === 401)
        {
          this.router.navigate(["/login"])
        }
      }
    console.log("Users Component Called");    
    console.log(data);
    this.users = JSON.parse(JSON.stringify(data));
  });
  }

}


  