import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PayapiService } from './payapi.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  strategyvisible: boolean;
  usertype:string;
  dayspending:number;

  constructor(private usersv:UserService, private apiservie:PayapiService) {
    this.strategyvisible = false;
    this.usertype = "Normal";
    this.dayspending=0;
   }

   MenubarConditions() {

    this.dayspending = 0;
    this.strategyvisible = false; 
    var email = this.usersv.getuserId()
    var presentdays:any;

    if(this.usersv.getuserType()=="0"){
       this.usertype = "Normal User";
    }else{
       this.usertype = "Admin User";
       this.strategyvisible = true; 
    }
    if(this.usersv.getuserType()=="0"){
        if(typeof email != "object"){

          this.apiservie.http_get('userpurchase/purchasesubscribedate/'+email)
            .subscribe((response:any) => {
              var usersubcription = response.payload;
              var noofdaysubsribe = usersubcription[0].days;
              var subscritionid = usersubcription[0].SubscriptionID;
              console.log(noofdaysubsribe, subscritionid)
              if(subscritionid=="0"){
                presentdays=(2-noofdaysubsribe);
              }
              else if(subscritionid=="1"){
                presentdays=(7-noofdaysubsribe)
              }
              else if(subscritionid=="2"){
                presentdays=(30-noofdaysubsribe);
              }
              else if(subscritionid=="3"){
                presentdays=(90-noofdaysubsribe);
              }
              this.dayspending =  parseInt(presentdays, 10);

              if(this.dayspending > 0){
                this.strategyvisible = true; 
              }
              console.log("this.dayspending", this.dayspending)

            }, (error:any) => {this.dayspending = 0;})
        }
      }
    console.log("this.dayspending", this.dayspending)
  }
}