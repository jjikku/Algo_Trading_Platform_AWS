import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from "@angular/common/http";
import { Params } from "@angular/router";
import { CommonURL } from 'src/services/common';

@Injectable({
    providedIn:'root'
})
export class addStrategyService {
    constructor(private http:HttpClient){}
    addStrategy(strat:any)
    {
        //return this.http.post("http://localhost:5000/strategy/addstrategy",{"strat":strat});
        return this.http.post(`${CommonURL.BASE_URL}/strategy/addstrategy`,{"strat":strat});
    }
}