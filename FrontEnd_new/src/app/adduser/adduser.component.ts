import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdduserService } from 'src/services/adduser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPasswordValidator } from '../signup/confirmedvalidator'; 

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private _addUserForm: FormBuilder, private addUserservice:AdduserService, private router:Router) { }
  
  addUserForm = this._addUserForm.group({
    fname: ["",Validators.required],
    lname: ["",Validators.required],
    email:["",[Validators.required,Validators.pattern("^([a-zA-Z0-9\-\._]+)@([A-Za-z\-]+)\\.([a-z]{2,3}(\.[a-z]{2,3})?)$")]],
    pwd:["",[Validators.required,Validators.minLength(8)]],
    cnfrmpwd:["",Validators.required]
  },
  {
    validator: ConfirmPasswordValidator("pwd", "cnfrmpwd")
  });


  ngOnInit(): void {
  }
  
  addUserDetails() {
    // var userDetails = 
    //  {
    //   fname:String,
    //   lname:String,
    //   email:String,
    //   pwd :String
    //  }

    const fname = this.addUserForm.controls['fname'].value;
    const lname = this.addUserForm.controls['lname'].value;
    const email = this.addUserForm.controls['email'].value;
    const pwd = this.addUserForm.controls['pwd'].value;
    const isAdmin=0; 

    this.addUserservice.addUserService({fname,lname,email,pwd,isAdmin})
    .subscribe((data:any) => {
      console.log("Add User Subscribe");
      let status = data.status;
      console.log("Add User Status="+status);
      if(!status)
      {
        alert("User Already Exists");
      }
      else
      {
        this.router.navigate(['/users']);
      }
  });
    
  }


}
