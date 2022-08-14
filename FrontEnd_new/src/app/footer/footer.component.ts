import { Component, OnInit } from '@angular/core';
import { GetApiService } from 'src/services/get-api.service'; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  
  constructor(private newsApiService: GetApiService,) { }

  
  ngOnInit(): void {
    
}

// getnews(query_string:any) {

//   this.newsApiService.apiCall(query_string).subscribe((data)=>{
//     this.data = (JSON.parse(JSON.stringify(data)).data);
//     // this.data_1 = (JSON.parse(JSON.stringify(data))[1].data);
//     // this.data_2 = (JSON.parse(JSON.stringify(data))[2].data);

//      console.log(this.data);

//      });    

// }



//  getRandomInt(minimum:any, maximum:any) {
//   let min = Math.ceil(minimum);
//   let max = Math.floor(maximum);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }
}
