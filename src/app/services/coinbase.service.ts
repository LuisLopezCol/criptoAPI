import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {
  urlAPICOP = "https://www.datos.gov.co/resource/ceyp-9c7c.json?$limit=10000";
  urlAPIEUR = "https://api.exchangerate.host";
  urlCurrentValue = 'https://api.coinbase.com/v2/prices/BTC-USD/buy'; 
  urlPreviousValues = 'https://api.coinbase.com/v2/prices/BTC-USD/spot?date=';

  constructor(private http: HttpClient) { }
  
  //Get exchange rate to convert EUR to USD
  public getEUR(date:any): Observable<any>{
      return this.http.get(`${this.urlAPIEUR}/${date}`);
  }
  //Get TRM to convert USD to COP
  public getCOP(): Observable<any>{
      return this.http.get(this.urlAPICOP);
  }
  //Get current value
  public getCurrent(): Observable<any> { 
    return this.http.get(this.urlCurrentValue);
  }

  //Get historics values - concatenate at the end each date (yyyy-mm-dd)
  public getPrevious(date: any): Observable<any>{
     return this.http.get(`${this.urlPreviousValues}${date}`);
  }
}
