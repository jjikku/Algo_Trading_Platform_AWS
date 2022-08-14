import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleuserService } from 'src/services/singleuser.service';
import { AuthService } from 'src/services/auth.service';
import { number } from 'echarts';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {
  public userStatus:String=""
  public createdUser:String=""
  public userType:String=""
  public userTypea:any
  public userStatusa:any
  constructor(private _ActivatedRoute:ActivatedRoute, private singleuserservice: SingleuserService, private router: Router,public _auth: AuthService,
    public userService:UserService) { }
  users = 
    {
      _id:Number,
      fname: String,
      lname:String,
      email:String,
      isAdmin:Number,
      blockstatus:Number,
      userstatus:Number
    }
  public params:any  
  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Activated Route = " + this.params);
      console.log("Read More Service Called (Single User)");    
        this.singleuserservice.readmore(this.params)
        .subscribe((data) => {
          //console.log(data);
          // if(data==0)
          // {
          //   this.usertype="Normal"
          // }

          if(data)
          {
            console.log("Single User Form Component data fetch")
            console.log(data);
            this.users = JSON.parse(JSON.stringify(data));
            this.userStatusa=this.users.blockstatus;
            var createdUsera:any=this.users.userstatus;
             this.userTypea=this.users.isAdmin;
            
             if(this.userStatusa==1)
             {
              this.userStatus="Blocked User";
             }
             else
             {
              this.userStatus="UnBlocked User";
             }
             if(createdUsera==1)
             {
              this.createdUser="User Created By Admin";
             }
             else
             {
              this.createdUser="Created By Signup";
             }
             if(this.userTypea==1)
             {
              this.userType="Admin User";
             }
             else
             {
              this.userType="Normal User";
             }

          }
    });
    
  }

editUser(id:any){
    this.router.navigate(['/edituser/'+id]);

}
addUser(){
  this.router.navigate(['/adduser']);

}
// deleteUser(id:any){
//   this.singleuserservice.deleteUser(id)
//   .subscribe((data) => {
//     console.log("User Deleted");
//     console.log(data);
//     alert("User Deleted");
//     this.router.navigate(['/users']);
//   });

//   }
blockUser(id:any){
  console.log("BlockUser"+ id) ;
  this.singleuserservice.blockUser(id,this.users)
  .subscribe((data) => {
    console.log("User Blocked");
    console.log(data);
    alert("User Blocked");
    this.router.navigate(['/users']);
  });

}
unBlockUser(id:any){
  console.log("BlockUser"+ id) ;
  this.singleuserservice.unBlockUser(id,this.users)
  .subscribe((data) => {
    console.log("User Un Blocked");
    console.log(data);
    alert("User Un Blocked");
    this.router.navigate(['/users']);
  });

}

}



