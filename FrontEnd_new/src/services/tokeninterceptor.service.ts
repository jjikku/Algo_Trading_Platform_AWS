import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor(private _authService: AuthService) { }
  intercept(req:any, next:any) {

    let tokenizedRequest = !this._authService.gettoken()  ? req : req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.gettoken()}`
      }
    })
    console.log(`token = Bearer ${this._authService.gettoken()}`)
    return next.handle(tokenizedRequest);
  }
}
