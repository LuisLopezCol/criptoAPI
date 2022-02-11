import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(public coinbaseService: CoinbaseService, public router: Router, private renderer2:Renderer2) { }

    ngOnInit(): void {
      this.changeDateFormat(this.todayDate);
      this.getCurrent();
      this.getPrevious(true, this.firstDay, this.firstDay);
  }
  
  //---------------------------- Get Curent Bitcoin Value
  bitcoinCurrent: any;
  fetchedTime: any;
  @ViewChild("restart") restart!: ElementRef;              
  getCurrent(){
    this.coinbaseService.getCurrent().subscribe((res) => {  
      this.bitcoinCurrent = res.data.amount;                                               //Current Value for the DOM
      localStorage.removeItem("current");                                                  //Clean the LS to fill it again only if we could connect to DB
      localStorage.setItem("current", res.data.amount);                                    //Saving the value in  LS
      this.fetchedTime = new Date();
      this.fetchedTime.getDate();                                                            //Save last date-time the current value was updated
      setTimeout(() => {
        this.getCurrent();                                                                 //Recursively call the method each 60 sec
        let restart = this.restart.nativeElement;                                          //Get access to the counter in the DOM
        restart.click();                                                                   //Restart the counter
      }, 60500);
    }, error =>{
      this.bitcoinCurrent = localStorage.getItem("current");                               //If 404 get prev value from LS
      Swal.fire({
        icon: 'warning',
        title: 'Could not get data',
        text: 'The connection was not successful, trying again in 60 seconds',
        timer: 3000
      })
      setTimeout(() => {
        this.getCurrent();                                                                 //Recursively call the method each 60 sec
        let restart = this.restart.nativeElement;                                          //Get access to the counter in the DOM
        restart.click();                                                                   //Restart the counter
      }, 60500);
      console.log(error);
    })    
  }

  //---------------------------- Get Historic Bitcoin Values
  bitcoinHistoric: any = [];                                                               //Final array with all objects fetched from API
  newDateFormatted: any;
  todayDate = new Date();
  firstDay: any = new Date();

  changeDateFormat(date: Date){                                                            //Change the date format
    return this.newDateFormatted = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  }                                                                                        
  
  getPrevious(autoQuery: boolean, start: any, end: any) {
    let totalDays: number;                                                                  //Total days to populate the values
    // ------ Loop to check if it is a custom query of defauLt
    if (autoQuery) {                                                                        //if autoQuery == "True", by default the total days will 15 days
      totalDays = 15
    } else {                                                                                //if autoQuery == "False", calculate the span between dates
      let splitStart: any = start.split('-');                                               //Convert from yyyy-mm-dd to Date Type to count the days between them
      let splitEnd: any = end.split('-');                                                   //Split the Data in a new Array then => convert it
      let  startArray = new Date(splitStart[0], splitStart[1]-1, splitStart[2]);            //Get a new Date Type 
      let  endArray  = new Date(splitEnd[0], splitEnd[1]-1, splitEnd[2]);
      totalDays = Math.round((endArray.getTime() - startArray.getTime())/(1000*3600*24));   //Substract the total of days of the User's Query
      if (totalDays<=0) {  
         Swal.fire({
        icon: 'warning',
        title: 'Input Error',
        text: 'The End Date must be greater than Start Date',
        timer: 3000
      })                                                                 //If user enter the "start" > "end", stop the program and alert 
        console.log("error, start > end");
      }
      start = new Date(start);                                                              //Set the new values for the program as entered by the user
      end = new Date(end);
      end.setDate(end.getDate() + 1)
    }
    // ------ Getting data from API and saving in LS
    let historicData: any = {};                                                             //Storing the historic data
    localStorage.removeItem("historic");                                                    //Clean the LS to fill it again only if we could connect to DB
    for (let i = 0; i <= totalDays; i++) { 
      let indexDate = this.changeDateFormat(end);   
      this.coinbaseService.getPrevious(indexDate).subscribe((res) => {  
        historicData = res;                                                             
        historicData.data.date = indexDate;                                                 //Adding to the "response" object the "date"
        if(localStorage.getItem("historic") == null){                                      
          this.bitcoinHistoric = [];                                                        //Declaring a new empty array since no data is in the LS
          this.bitcoinHistoric.push(historicData);                                          //Pushing the fetch object into the array
          localStorage.setItem("historic", JSON.stringify(this.bitcoinHistoric));           //Saving the array in  LS
        }else{
          this.bitcoinHistoric = JSON.parse(localStorage.getItem("historic")!);             //Getting array from LS to add new object fetched
          this.bitcoinHistoric.push(historicData);                                          //Pushing object to array
          end.setDate(end.getDate() - 1 );                                                  //For each loop fetch data for previous date
          localStorage.setItem("historic", JSON.stringify(this.bitcoinHistoric))};          //Saving the array in  LS
        }, error =>{
          Swal.fire({
            icon: 'warning',
            title: 'Could not get data',
            text: 'The connection was not successful, please trying again or communicate with IT Team',
            timer: 3000
          })
      console.log(error);
    })
        end.setDate(end.getDate() - 1 );                                                    //For each loop fetch data for previous date
    }
  };
      
  //---------------------------- Get Other Currencies
  @ViewChild('toastDetail') toastDetail!: ElementRef;                                       //Creating a toast to show the detail data
  showToast () {
    const toastDetail = this.toastDetail.nativeElement;
    this.renderer2.addClass(toastDetail,"show-toast");
    this.renderer2.removeClass(toastDetail,"hide-toast");
  setTimeout(() => {
    this.hideToast();                                                                       //In 30 sec hide the toast | UX improvement
  }, 30000);
  }
  hideToast () {
    const toastDetail = this.toastDetail.nativeElement;
    this.renderer2.addClass(toastDetail,"hide-toast");
    this.renderer2.removeClass(toastDetail,"show-toast");
  }

  exchRateEUR: any;                                                                         //Storing each currency exchange rate for bitcoin
  exchRateCOP: any;
  exchRateUSD: any;
  dateExchange: any;
  getTRM(date: any, USD: any){
    this.coinbaseService.getEUR(date).subscribe((res) => {  
      this.exchRateUSD = USD;                                                               //USD keeps the same
      this.exchRateEUR = (this.exchRateUSD/res.rates.USD);                                  //Rule of 3 t get EUR
      this.exchRateCOP = (this.exchRateUSD/(res.rates.USD/res.rates.COP));                  //Double Rule of 3 to get COP using BIT to USD and EUR to COP     
      this.dateExchange = date;
      console.log(date, USD);
      
    }, error =>{
      Swal.fire({
        icon: 'warning',
        title: 'Could not get data',
        text: 'The connection was not successful, please trying again or communicate with IT Team',
        timer: 3000
      })
      console.log(error);
    });
  }
}
