import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private http:HttpClient) { }
  apiCall(query_string:any)
  {
    //return this.http.get(`https://newsapi.org/v2/everything?q="${query_string}"&from=2022-07-11&sortBy=publishedAt&apiKey=43a6fb4847b64c6281078cd4d0d42c41`);
    //return this.http.get(`http://news.google.com/rss/search?q="${query_string}"&hl=en-IN&gl=IN&ceid=IN:en`);
    //return this.http.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyA_ADtlmlp1KG3e_qBr-W9yYVSnfsYW4KI&cx=0266e82f99283433c&q="${query_string}"`);
    //return this.http.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyA_ADtlmlp1KG3e_qBr-W9yYVSnfsYW4KI&cx=0266e82f99283433c&q=stock');
    return this.http.get(`https://api.marketaux.com/v1/news/all?symbols="${query_string}"&filter_entities=true&language=en&api_token=3Mfbpw8zZfgYlCPJyQZH0liVeg5qD1Y9VP2r1kCd`);
  }
}
