import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { StratpnlService } from "src/services/stratpnl.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:any;
  IsAdm:any;
  constructor(public _stratPnlService: StratpnlService, public userService: UserService, public _auth: AuthService) { }

  ngOnInit(): void {
    
    
  }
  getuser(){
    if(this._auth.loggedIn())
    {
      this.username = localStorage.getItem("fname");

      //this.username = this.userService.getuser();
      //console.log("header "+ this.username);
    }
  }
  getuserType(){
    if(this._auth.loggedIn())
    {
      this.IsAdm= this.userService.getuserType();
      console.log("Admin Variable"+this.IsAdm);
    }
  }
}
