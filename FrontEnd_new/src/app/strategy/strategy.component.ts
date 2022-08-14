import { Component, OnInit,Input } from '@angular/core';
import { StrategyService } from 'src/services/strategy.service';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {
  strategy = [{
    _id:Number,
    stratname:String,
    strategy:String,
    about:String
  }
  ]

  constructor(private userservice: UserService, private strategyservice:StrategyService,private router:Router) { }

  ngOnInit(): void {
    var useremail = this.userservice.getuserId();
    var IsUserAdmin = this.userservice.getuserType();
    if(typeof useremail == "object"){
        alert("user email not found")
    }
    else{
        console.log(useremail)
        this.strategyservice.getstrategybyUserId(useremail, IsUserAdmin)
        .subscribe((data) =>{
          //console.log(data)
          if(data instanceof HttpErrorResponse)
          {
            if(data.status === 401)
            {
              this.router.navigate(["/login"])
            }
            
          }
          else{
            this.router.navigate(["/strategy"])
          }
          //console.log(data)

          console.log("Get Service")
          this.strategy=JSON.parse(JSON.stringify(data))
        });
     }
  }
  deleteStrategy(id:any){
    this.strategyservice.deletestrategy(id)
    .subscribe((data) => {
      alert("Strategy Deleted");
      this.router.navigate(['/strategy']);
      window.location.reload();
    });
  }
}
