import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './common';

@Injectable({
  providedIn: 'root'
})
export class PayapiService {

  constructor(private http:HttpClient) { }

  http_get(url:any){
    return this.http.get<any>(CommonURL.BASE_URL+'/'+url);
  }

  http_post(url:any,body:any){
    return this.http.post<any>(CommonURL.BASE_URL+'/'+url,body)
  }

  http_put(url:any,body:any){
    return this.http.put<any>(CommonURL.BASE_URL+'/'+url,body)
  }

  http_delete(url:any,body:any){
    return this.http.delete<any>(CommonURL.BASE_URL+'/'+url,body)
  }
}