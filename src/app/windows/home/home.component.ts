import { Component, OnInit } from '@angular/core';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import {  Router } from '@angular/router';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public coinbaseService: CoinbaseService, public router: Router) { }
  ngOnInit(): void {
    // this.getDate();
    this.saveDate(this.firstDay, this.todayDate);
    this.changeDateFormat(this.todayDate)
      // this.dailyValue = JSON.parse(localStorage.getItem("dates")!);
      // console.log(this.dailyValue);
      

  }
  bitcoinCurrent = [];
  bitcoinHistoric: any = []; //Final array with all objects fetched from API
  //Find current date
  // todate: any = new Date();
  test: any;
  todayDate = new Date();
  firstDay: any = new Date();
  lastDay: any = new Date();
  startDate: any = new Date();
  dateStart: any;
  dateEnd: any;
  changeDateFormat(date: Date){
    return this.test = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  }

  getDates() {
    this.firstDay.setDate(this.todayDate.getDate() - 15);
    this.dateStart = this.changeDateFormat(this.firstDay);
    this.dateEnd = this.changeDateFormat(this.lastDay);
  }
  //Store the data in the LS in order to have it available when the network crashes
  saveDate(start: any, end: any) {
    let historicData: any = {};                                                           //Storing the historic data
    localStorage.removeItem("historic");                                                  //Clean the LS to fill it again only if we could connect to DB
    for (let i = 0; i < 15; i++) { 
      let indexDate = this.changeDateFormat(end);   
      this.coinbaseService.getPrevious(indexDate).subscribe((res) => {  
        historicData = res;   
        historicData.data.date = indexDate;                                //Adding to the res the "date"
        if(localStorage.getItem("historic") == null){                                      //
          this.bitcoinHistoric = [];                                                       //Declaring an empty array since no data is in the LS
          this.bitcoinHistoric.push(historicData);                                         //Pushing the fetch object into the array
          localStorage.setItem("historic", JSON.stringify(this.bitcoinHistoric));          //Saving the array in  LS
        }else{
          this.bitcoinHistoric = JSON.parse(localStorage.getItem("historic")!);            //Getting array from LS to add new object fetched
          this.bitcoinHistoric.push(historicData);                                         //Pushing object to array
          end.setDate(end.getDate() - 1 );                                                  //For each loop fetch data for previous date
          localStorage.setItem("historic", JSON.stringify(this.bitcoinHistoric))};         //Saving the array in  LS
          console.log("test",JSON.parse(localStorage.getItem("historic")!));
        })
        end.setDate(end.getDate() - 1 );                                                  //For each loop fetch data for previous date
    }
  };
  viewLoadList: boolean = true;
  
  getCurrent(){
      this.coinbaseService.getCurrent().subscribe((previousValue) => {  
      console.log(previousValue);
    }, error =>{
      console.log(error);
    })
  }
  // arrayOfValues: any = {};
  //   getPrevious(date: any){
  //   this.coinbaseService.getPrevious(date).subscribe((res) => {  
  //     console.log(res);
  //     this.arrayOfValues
  //   }, error =>{
  //     console.log(error);
  //   })
  // }
  
}
