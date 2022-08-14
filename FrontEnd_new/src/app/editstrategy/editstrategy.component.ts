import { Params } from '@angular/router';
import { StrategyService } from 'src/services/strategy.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-editstrategy',
  templateUrl: './editstrategy.component.html',
  styleUrls: ['./editstrategy.component.css']
})
export class EditstrategyComponent implements OnInit {

  constructor(private strategyservice: StrategyService, private http: HttpClient, 
  private _ActivatedRoute:ActivatedRoute, 
  // private _editStrategyForm: FormBuilder,
  private editstrategyservice:StrategyService, private router:Router) { }

  // editStrategyForm = this._editStrategyForm.group({
  //   stratname: [""],strategy: [""]});

  strategy= {
    stratname:String,
    strategy:String,
    about:String
  }
  public params:any  
  ngOnInit(): void {
      this.params = this._ActivatedRoute.snapshot.paramMap.get("Id");
      this.strategyservice.getstrategy(this.params)
      .subscribe(data => {
        this.strategy.stratname = JSON.parse(JSON.stringify(data)).stratname;
        this.strategy.strategy = JSON.parse(JSON.stringify(data)).strategy;
        this.strategy.about = JSON.parse(JSON.stringify(data)).about;
      });
  }

  editStrategy() {
    const stratname = this.strategy.stratname; //this.editStrategyForm.controls['stratname'].value;
    const strategy = this.strategy.strategy ; //this.editStrategyForm.controls['strategy'].value;
    const about = this.strategy.about;
    const strategyCol = {
      stratname,
      strategy,
      about
    }
      console.log(strategyCol)
      this.editstrategyservice.editStrategy(this.params, strategyCol)
      .subscribe((data) => {
        if(data)
        {
          this.strategy = JSON.parse(JSON.stringify(data));
          console.log(this.strategy);
        }
        this.router.navigate(['/strategy']);
      });
  }

}
