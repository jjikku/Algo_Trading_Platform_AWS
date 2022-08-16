import { UserService } from 'src/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayapiService } from 'src/services/payapi.service';
import { CommonURL } from 'src/services/common';
import { NavbarService } from './../../services/navbar.service';
declare var Razorpay: any; 

@Component({
  selector: 'app-subscriptstrategy',
  templateUrl: './subscriptstrategy.component.html',
  styleUrls: ['./subscriptstrategy.component.css']
})
export class SubscriptstrategyComponent implements OnInit {
  
  payment_creation_id=null;
  static API_SERVICE:PayapiService ;
  PlanZeroBlocked:boolean =true;
  PlanOneBlocked:boolean=true;
  PlanTwoBlocked:boolean=true;
  PlanThreeBlocked:boolean=true;
  public NoDaysPending:number=0;

  razorPayOptions = {
    "key": '', // Enter the Key ID generated from the Dashboard
    "amount": '1000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
    "currency": "INR",
    "name": "Algo Trading Ltd",
    "description": "Alog Trade bill payment",
    "order_id":"ORDERID_FROM_BACKEND",
//    "image": "https://example.com/your_logo",
    // "callback_url": 'http://localhost:4200',
    // "redirect" :true,
    "handler": function (response:any) {
      console.log("this is the response ",response);
    },
    "notes": {
        "address": "Thank you for saving people in need"
    },
    "theme": {
        "color": "#8bf7a8"
    },
    http_post:this.apiService
};

  constructor(private nav:NavbarService,private route: ActivatedRoute,
    private apiService: PayapiService, private userservice: UserService, private router: Router
    ) { SubscriptstrategyComponent.API_SERVICE = this.apiService}

  ngOnInit(): void {
    this.subscribedetails();
  }

  async Procedure(event:any) {

    
    var subid=event.target.value;
    var planidAmount = CommonURL.SUBSCRIPTION_PLAN[subid].Amount;
    var username = this.userservice.getuser();
    var useremail = this.userservice.getuserId();

    //var username = "aneesh";
    //var useremail = "aneeshvdas@gmail.com"

    if(typeof useremail == "object"){
        alert("userid and user email not found")
    }
    else{

        let finalObject = {
          "user_id":"5e7a6fcd3cd6e61c5059ca62",
          "business_id":"id001",
          "amount": Number(planidAmount),
          "recipient_name":username,
          "recipient_email":useremail,
          "user_email":useremail,
          "user_name":username,
          "user_subscrionId":subid,
          "_id":""
        }

        this.apiService.http_post(CommonURL.URL_PURCHASE_GIFT_CARD, finalObject)
        .subscribe((response) => {
          let payload = response.payload;
          if (payload["key"]) {
            this.razorPayOptions.key = payload["key"];
            this.razorPayOptions.order_id = payload["dbRes"]["id"];
            this.razorPayOptions.amount =  payload["dbRes"]["amount"];
            this.razorPayOptions.handler =  this.razorPayResponseHandler;
            finalObject["_id"] =payload["dbRes"]["id"]
            sessionStorage.setItem("temp",JSON.stringify(finalObject))

            var rzp1 = new Razorpay(this.razorPayOptions);
            //const rzp1 = new this.winRef.nativeWindow.Razorpay(this.razorPayOptions);
            rzp1.open();
            //this.subscribedetails();
            //this.router.navigate(['/subscriptstrategy'])
            //event.preventDefault();
            if(subid==0){
              this.PlanZeroBlocked = false;
            }
            else if(subid==1){
              this.PlanOneBlocked = false;
            }
            else if(subid==2){
              this.PlanTwoBlocked = false;
            }
            else if(subid==3){
              this.PlanThreeBlocked = false;
            }
          } else {
            // bro show error here
          }
        }, (error) => {
          console.log("error", error);
        });
    }
  }

  razorPayResponseHandler(response:any){

    let storage_data:any =sessionStorage.getItem('temp') 
    let sess =  JSON.parse(storage_data);
    console.log("storage ",sess)
    let paymentObject= {
      _id:sess._id,
      payment:response,
      user_name:sess.recipient_name,
      amount: sess.amount,
      recipient_email:sess.recipient_email,
      user_email:sess.recipient_email,
      user_subscrionId:sess.user_subscrionId
    }
    console.log("payment object ",paymentObject)
    SubscriptstrategyComponent.API_SERVICE.http_put(CommonURL.URL_PURCHASE_GIFT_CARD_SUCCESS,paymentObject)
      .subscribe(success=>{
          console.log("success");
         
          if(sess.user_subscrionId==0){
            this.PlanZeroBlocked = false;
          }
          else if(sess.user_subscrionId==1){
            this.PlanOneBlocked = false;
          }
          else if(sess.user_subscrionId==2){
            this.PlanTwoBlocked = false;
          }
          else if(sess.user_subscrionId==3){
            this.PlanThreeBlocked = false;
          }
          alert("payment success and mail send");
          sessionStorage.removeItem('temp');
          window.location.reload();

          //this.subscribedetails();
          //this.router.navigate(['/subscriptstrategy'])
      },
      error=>{
          console.log("error", error)
          alert("error occured");
      }
     )
   }

  subscribedetails(){
        var useremail = this.userservice.getuserId();
        //var useremail = "aneeshvdas@gmail.com";
        if(typeof useremail != "object"){
          this.apiService.http_get('userpurchase/purchase/'+useremail)
            .subscribe((response) => {
              var usersubcription = response.payload;
              for(var i=0; i<usersubcription.length; i++)
              {
                if(usersubcription[i].SubscriptionID == 0){
                    var d1 = usersubcription[i].creationDate;
                    var d2 = new Date();
                    if(this.getDayDiff(d1, d2) <= 2){
                      this.PlanZeroBlocked = false;
                    }
                }
                if(usersubcription[i].SubscriptionID == 1){
                  var d1 = usersubcription[i].creationDate;
                  var d2 = new Date();
                  if(this.getDayDiff(d1, d2) <= 7){
                    this.PlanOneBlocked = false;
                  }
                }
                if(usersubcription[i].SubscriptionID == 2){
                  var d1 = usersubcription[i].creationDate;
                  var d2 = new Date();
                  if(this.getDayDiff(d1, d2) <= 30){
                    this.PlanTwoBlocked = false;
                  }
                }
                if(usersubcription[i].SubscriptionID == 3){
                    var d1 = usersubcription[i].creationDate;
                    var d2 = new Date();
                    if(this.getDayDiff(d1, d2) <= 120){
                      this.PlanThreeBlocked = false;
                    }
                }
              }
              this.subscriptionDayspending(useremail);

            }, (error) => {
              console.log("error", error);
            })
        }

        this.nav.MenubarConditions();
    }


  subscriptionDayspending(event:any){
    var useremail = event;
    //var useremail = "aneeshvdas@gmail.com";
    if(typeof useremail != "object"){
      this.apiService.http_get('userpurchase/purchasesubscribedate/'+useremail)
        .subscribe((response) => {
          var usersubcription = response.payload;
          var noofdaysubsribe = usersubcription[0].days;
          var subscritionid = usersubcription[0].SubscriptionID;

          if(subscritionid=="0"){
            this.NoDaysPending=(2-noofdaysubsribe);
          }
          else if(subscritionid=="1"){
            this.NoDaysPending=(7-noofdaysubsribe)
          }
          else if(subscritionid=="2"){
            this.NoDaysPending=(30-noofdaysubsribe);
          }
          else if(subscritionid=="3"){
            this.NoDaysPending=(90-noofdaysubsribe);
          }
        }, (error) => {
          console.log("error", error);
        })
    }
  }

  getDayDiff(startDate: Date, endDate: Date): number {
    var t = +(endDate) - +(new Date(startDate));
    var diffDays = Math.ceil(t / (1000 * 3600 * 24));
    return diffDays;
  }
}