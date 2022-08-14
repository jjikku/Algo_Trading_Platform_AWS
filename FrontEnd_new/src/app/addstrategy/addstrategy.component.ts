import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder,Validators } from '@angular/forms';
import { addStrategyService } from 'src/services/addStrategy.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-addstrategy',
  templateUrl: './addstrategy.component.html',
  styleUrls: ['./addstrategy.component.css']
})
export class AddstrategyComponent  {
  //list1:any;
  useremail:any;
  list1 = [{text: '', id:0}];
  fulltext:any;
  buysellsall = [{id:'b', name:'BUY'},{id:'s', name:'SELL'}];
  callputfut = [{id:'CE', name:'CALL'},{id:'PE', name:'PUT'}];
  buysell:string='b'; 
  cepe:string='CE';
  
  constructor(private userService: UserService, private _addStrategyForm:UntypedFormBuilder,private addstrategyservice:addStrategyService,private router:Router) { 
    //const emaiuserend = this.userService.getuserId();
    //console.log(emaiuserend)
  }

  getuserId(){
    this.useremail = this.userService.getuserType();
  }

  addStrategyForm = this._addStrategyForm.group({
    stratname:[""],strategy:[""],liitemid:[""],
    entrytime:[""],exittime:[""],slperc:[""],
    buysell:[this.buysell[0]],cepe:["CE"],strike:[""],
    expiry:[""],qtyinlots:[""],profitperc:[""],about:[]
  });

  strategycriteria= {strategy:String, about:String}

  changeValue(event: any): void {
    this.buysell = event.target.options[event.target.options.selectedIndex].text;
    }
  
    changeValuecepe(event: any): void {
    this.cepe = event.target.options[event.target.options.selectedIndex].text;
    }
  addSchedule()
  {
    const entrytime=this.addStrategyForm.controls['entrytime'].value;
    const exittime=this.addStrategyForm.controls['exittime'].value;
    const slperc=this.addStrategyForm.controls['slperc'].value;
    const profitperc=this.addStrategyForm.controls['profitperc'].value; //new field added
    const buysell=this.addStrategyForm.controls['buysell'].value;
    //console.log(this.addStrategyForm);
    //const buysell=this.buysell
    const cepe=this.addStrategyForm.controls['cepe'].value;
    const strike=this.addStrategyForm.controls['strike'].value;
    const expiry=this.addStrategyForm.controls['expiry'].value;
    const qtyinlots=this.addStrategyForm.controls['qtyinlots'].value;
    
    this.fulltext = this.getsinglestrategy(entrytime,exittime,slperc,buysell,cepe,strike,expiry,qtyinlots,profitperc);

    if(this.list1.length==1){
      if(this.list1[0].text==""){
        this.list1.splice(0,1);
      }
    }
    this.list1.push({text: this.fulltext, id:this.list1.length+1});
    this.getfullstrategyquery();
    
  }

  getfullstrategyquery(){
    let fulltext:any='';
    let headertext:any = "function dummy_straddle() {var s, ce, pe;";
    let footertext:any='function set_n(entry_time,exit_time,stop_loss_percentage,target_profit_percentage,buy_sell,ce_pe,strike,expiry,qty_in_lots) {var set_params = {entry_time: entry_time,buy_sell: buy_sell,exit_time: exit_time,stop_loss_percentage: stop_loss_percentage,target_profit_percentage: target_profit_percentage,ce_pe: ce_pe,strike: strike,expiry: expiry,qty_in_lots: qty_in_lots,};return set_params;}return [';
    let footersub:any='';
    let fulllogictext:any = ''; 
    var indexcounter:Number;
    for(let counter=0;counter<this.list1.length;counter++){
      indexcounter = counter + 1;
      fulllogictext = fulllogictext + 
      "var set" + indexcounter.toString() +" = set_n(" 
      + this.list1[counter].text.toString()
      + ");";
      if(counter == this.list1.length-1)
      {
        footersub = footersub + "set" + indexcounter.toString();
      }else{
        footersub = footersub + "set" + indexcounter.toString() + ", ";
      }
    }
    footersub = footersub + "];}";
    fulltext = headertext + fulllogictext + footertext + footersub;
    this.strategycriteria.strategy = fulltext;
  }

  getsinglestrategy(entrytime:any,exittime:any,slperc:any,buysell:any,cepe:any,strike:any,expiry:any,qtyinlots:any,profitperc:any)
  {
      //return "'" + entrytime+"','"+exittime+"',"+slperc+",'"+buysell+"','"+cepe+"',"+strike+",'"+expiry+"',"+qtyinlots;
      return '"' + entrytime+'","'+exittime+'",'+slperc+','+profitperc+',"'+buysell+'","'+cepe+'",'+strike+',"'+expiry+'",'+qtyinlots;
  }

  public toggleSelection(item:any, list:any) {
    item.selected = !item.selected;
  }

  selectedIndex: any;

  select(index: number) {
      this.selectedIndex = index;
      console.log(this.selectedIndex)
  }

  listClick(event:any, newValue:any) {
    console.log(newValue);
}

removeItem(index:any) {
  console.log(index)
  this.list1.splice(index,1);
  this.getfullstrategyquery()
}
  addStrategy()
    { 
      console.log(this.addStrategyForm.controls['stratname'].value)

      const stratname   = this.addStrategyForm.controls['stratname'].value;
      const strategy    = this.addStrategyForm.controls['strategy'].value;
      const about       = this.addStrategyForm.controls['about'].value;
      const useremailid = this.userService.getuserId();

      
      if((strategy =="") || (strategy == "function String() { [native code] }")){
        alert("strategy criteria cannot be blank");
        return;
      }
      if((about == "") || (about == "function String() { [native code] }")){
        alert("strategy Description cannot be blank");
        return;
      }

      const strats ={
        stratname,
        strategy,
        about,
        useremailid
      }

      console.log(strats);
      
      this.addstrategyservice.addStrategy(strats)
      .subscribe((data) =>{
        console.log("add strategy called");
        console.log(data);
        this.router.navigate(['/strategy']);
      });
    }

}
