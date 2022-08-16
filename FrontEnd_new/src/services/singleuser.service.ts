import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { CommonURL } from 'src/services/common';

@Injectable({
  providedIn: 'root'
})
export class SingleuserService {

  constructor(private http:HttpClient) { }
  readmore(id:any)
  {   
    const params = new HttpParams();
    return this.http.get(`${CommonURL.BASE_URL}/singleuser/`+id);
    //return this.http.get("http://localhost:5000/singleuser/"+id);

  }
  editUser(user:any)
  {   
    return this.http.post<any>(`${CommonURL.BASE_URL}/singleuser/`+user._id, {"user":user});

   // return this.http.post<any>("http://localhost:5000/singleuser/"+user._id, {"user":user});

  }
  deleteUser(id:any)
  {   
    return this.http.delete<any>(`${CommonURL.BASE_URL}/singleuser/`+id);

    //return this.http.delete<any>("http://localhost:5000/singleuser/"+id);

  }
  blockUser(id:any,user:any)
  {   
    console.log("Block Service. "+user);
    return this.http.post(`${CommonURL.BASE_URL}/singleuser/block/`+id,{"user":user});

    //return this.http.post("http://localhost:5000/singleuser/block/"+id,{"user":user});

  }
  unBlockUser(id:any,user:any)
  {   
    console.log("Block Service. "+user);
    return this.http.post(`${CommonURL.BASE_URL}/singleuser/unblock/`+id,{"user":user});

//    return this.http.post("http://localhost:5000/singleuser/unblock/"+id,{"user":user});

  }
  
  getUserAdminStatus(admstatus:any){
    console.log(admstatus);
    // if(admstatus==1)
    // {
    // return.this("Admin")
    // }
  
  }

}




