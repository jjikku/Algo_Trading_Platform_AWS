import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from "@angular/common/http";
import { CommonURL } from 'src/services/common';

@Injectable({
  providedIn: 'root'
})
export class StratpnlService {

  constructor(private http:HttpClient){}
    getPnl(id:any)
    {
      return this.http.get(`${CommonURL.BASE_URL}/deploy/`+id);
        //return this.http.get("http://localhost:5000/deploy/"+id);
    }
    exitStrategy()
    {
      return this.http.get(`${CommonURL.BASE_URL}/deploy/exit`);

     // return this.http.get("http://localhost:5000/deploy/exit");

    }
    execute(id:any)
    {
      return this.http.get(`${CommonURL.BASE_URL}/deploy/execute/`+id);

     // return this.http.get("http://localhost:5000/deploy/exit");

    }
}
