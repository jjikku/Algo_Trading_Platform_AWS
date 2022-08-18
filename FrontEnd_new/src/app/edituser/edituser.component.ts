import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { UsersService } from 'src/services/users.service';
//import { EdituserService } from 'src/services/edituser.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private editservice: UserService, private http: HttpClient, private _ActivatedRoute:ActivatedRoute, 
    private _editUserForm: FormBuilder, private edituserservice:UserService, private router:Router) { }
  editUserForm = this._editUserForm.group({
    fname: ["", Validators.required],
    lname: ["",Validators.required],
    email: ["",[Validators.required, Validators.pattern("^([a-zA-Z0-9\-\._]+)@([A-Za-z\-]+)\\.([a-z]{2,3}(\.[a-z]{2,3})?)$")]],
    pwd: ["",[Validators.required,Validators.minLength(8)]],

  });

  users= {
    fname:String,
    lname:String,
    email:String,
    pwd:String    

  }
  
  public params:any  

  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    //console.log("Params Activated Route = " + this.params);

    this.editservice.getSingleUser(this.params)
        .subscribe(data => {
        this.users.fname = JSON.parse(JSON.stringify(data)).fname;
        this.users.lname = JSON.parse(JSON.stringify(data)).lname;
        this.users.email = JSON.parse(JSON.stringify(data)).email;
        this.users.pwd = JSON.parse(JSON.stringify(data)).pwd;
        console.log("Edit Form on init= " + JSON.parse(JSON.stringify(data)))
      });
    }
  

    editUserDetails() {

      // var userDetails = { 
      //   fname:String,
      //   lname:String,
      //   email:String,
      //   pwd :String
        
      //  }
      // userDetails.fname = this.editUserForm.controls['fname']==""?this.users.fname:this.editUserForm.controls['fname'].value;
      // userDetails.lname = this.editUserForm.controls['lname'].value==""?this.users.lname:this.editUserForm.controls['lname'].value;
      // userDetails.email = this.editUserForm.controls['email'].value==""?this.users.email:this.editUserForm.controls['email'].value;
      // userDetails.pwd = this.editUserForm.controls['pwd'].value==""?this.users.pwd:this.editUserForm.controls['pwd'].value;


       const fname=this.users.fname;
       const lname=this.users.lname;
       const email=this.users.email;
       const pwd=this.users.pwd;
       const userDetails = { fname,lname,email,pwd  }

      this.edituserservice.editUser(this.params,userDetails).subscribe((data) => {
          if(data)
          {
            // console.log("Single User Component data fetch..")
            // console.log(data);
            this.users = JSON.parse(JSON.stringify(data));
            console.log(this.users);
          }
          this.router.navigate(['/users']);
    
        });
      
    }

}


  