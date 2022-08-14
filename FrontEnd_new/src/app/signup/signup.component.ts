import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/services/signup.service'; 
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPasswordValidator } from './confirmedvalidator'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private signup: FormBuilder, private _signup: SignupService) {}
  

  signupForm = this.signup.group({
    fname: ["", Validators.required],
    lname: ["",Validators.required],
    email: ["",[Validators.required, Validators.pattern("^([a-zA-Z0-9\-\._]+)@([A-Za-z\-]+)\\.([a-z]{2,3}(\.[a-z]{2,3})?)$")]],
    pwd: ["",[Validators.required,Validators.minLength(8)]],
    cnfrmpwd:["",[Validators.required]]

  },
  {
    validator: ConfirmPasswordValidator("pwd", "cnfrmpwd")
  });


  ngOnInit(): void {
  }
  signUp()
  {    
    console.log("Service Called");    
    const fname = this.signupForm.controls['fname'].value;
    const lname = this.signupForm.controls['lname'].value;
    const email = this.signupForm.controls['email'].value;
    const pwd = this.signupForm.controls['pwd'].value;

    this._signup.signUp({fname,lname,email,pwd})
    .subscribe((data) => {
      console.log("signup subscribe");
      
        let status = data.status;
        console.log("status="+status);
        if(!status)
        {
          alert("User already exists");
          this.router.navigate(["/signup"]);
        }
        else{
          this.router.navigate(["/login"]);
        }
    })
    

  }
}
