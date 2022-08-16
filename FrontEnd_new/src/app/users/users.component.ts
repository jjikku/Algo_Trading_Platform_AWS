import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
//import { UsersService } from 'src/services/users.service';
import { UserService } from 'src/services/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
/// For Pagination Starts
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
/// For Pagination Ends

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
  /// For Pagination Starts
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers():void{
    this.userservice.getUsers().subscribe((data) => {
      if(data instanceof HttpErrorResponse)
      {
        if(data.status === 401)
        {
          this.router.navigate(["/login"])
        }
      }
      // console.log("Users Component Called");    
      // console.log(data);
      this.POSTS = JSON.parse(JSON.stringify(data))//data;
      //this.users = JSON.parse(JSON.stringify(data));
  });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchUsers();
  }

  /// For Pagination Ends

  // ngOnInit(): void {
  //   this.userservice.getUsers().subscribe((data) => {
  //     if(data instanceof HttpErrorResponse)
  //     {
  //       if(data.status === 401)
  //       {
  //         this.router.navigate(["/login"])
  //       }
  //     }
  //     // console.log("Users Component Called");    
  //     // console.log(data);
  //     this.users = JSON.parse(JSON.stringify(data));
  // });
  // }

}


  