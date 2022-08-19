import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { Router } from '@angular/router';
import { SinglestrategyService } from 'src/services/singlestrategy.service';
import { StratpnlService } from 'src/services/stratpnl.service';

@Component({
  selector: 'app-singlestrategy',
  templateUrl: './singlestrategy.component.html',
  styleUrls: ['./singlestrategy.component.css']
})
export class SinglestrategyComponent implements OnInit {

  constructor( private _ActivatedRoute:ActivatedRoute, private singleStrageyService: SinglestrategyService, private StratpnlService:StratpnlService, private router: Router) { }
  strategy = [{
    _id:Number,
    stratname:String,
    strategy:String,
    about:String
  }
  ]
  public params:any  
  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Activated Route = " + this.params);
  
    
      console.log("read more Service Called");    
        this.singleStrageyService.readmore(this.params)
        .subscribe((data) => {
          if(data)
          {
            console.log("Single Strategy Component data fetch")
            //console.log(data);
            this.strategy = JSON.parse(JSON.stringify(data));
            console.log(this.strategy);
          }
          //this.router.navigate(['/l']);
    
          
    });
    
    
  }
  editStrategy(id:any){
    this.router.navigate(['/editstrategy/'+id]);

}
deleteStrategy(id:any){
  this.singleStrageyService.deleteStrategy(id)
  .subscribe((data) => {
    console.log("Strategy deleted");
    console.log(data);
    alert("Strategy Deleted");
    this.router.navigate(['/strategy']);
  });
  
}
deployStrategy(id:any){
  console.log("Deploy strategy clicked");
  //this.router.navigate(['/deploy/'+id]);
  this.router.navigate(['/stratpnl/'+id]);

}
}
