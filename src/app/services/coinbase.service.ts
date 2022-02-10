import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {
  //Links to fetch the data
  urlTRM = "https://www.datos.gov.co/resource/ceyp-9c7c.json?$limit=10000";
  urlCurrentValue = 'https://api.coinbase.com/v2/prices/BTC-USD/buy'; 
  urlPreviousValues = 'https://api.coinbase.com/v2/prices/BTC-USD/spot?date=';

  constructor(private http: HttpClient) { }
  
  //Get TRM to convert USD to COP
  public getTRM(){
      return this.http.get(this.urlTRM);
  }
  //Get current value
  public getCurrent(): Observable<any> { 
    return this.http.get(this.urlCurrentValue);
  }

  //Get historics values - concatenate at the end each date (yyyy-mm-dd)
  public getPrevious(date: any){
     return this.http.get(`${this.urlPreviousValues}${date}`);
  }
}
