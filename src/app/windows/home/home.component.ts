import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import {  Router } from '@angular/router';
import { DetailComponent} from '../detail/detail.component';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public coinbaseService: CoinbaseService, public router: Router) { }
    //  @ViewChild("startDay") startDay!: ElementRef;

     
    ngOnInit(): void {
      this.getCurrent();
      this.saveDate(true, this.firstDay, this.firstDay);
      
      this.changeDateFormat(this.todayDate);
      console.log("this is today", this.dateStart);
      //  let startDay = this.startDay.nativeElement;
      //  startDay.value = this.dateStart;
  }
  
  //----------- Get cuurent Bitcoin Value
  fetchedTime  = new Date();
  @ViewChild("restart") restart!: ElementRef;
  getCurrent(){
    this.coinbaseService.getCurrent().subscribe((res) => {  
      this.bitcoinCurrent = res.data.amount;
      console.log(this.bitcoinCurrent);
      this.fetchedTime.getDate;
      setTimeout(() => {
        this.getCurrent();
        let restart = this.restart.nativeElement;
        restart.click();
      }, 60500);
    }, error =>{
      console.log(error);
    })
  }

  //----------- Get Historic Bitcoin Values
  bitcoinCurrent: any;
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

  saveDate(newQuery: boolean, start: any, end: any) {
    let totalDays: number; //Loop
    
    if (newQuery) {
      totalDays = 15
    } else {
      let splitStart: any = start.split('-');
      let splitEnd: any = end.split('-');
      let  startArray = new Date(splitStart[0], splitStart[1]-1, splitStart[2]);
      let  endArray  = new Date(splitEnd[0], splitEnd[1]-1, splitEnd[2]);
      totalDays = Math.round((endArray.getTime() - startArray.getTime())/(1000*3600*24));
      start = new Date(start);
      end = new Date(end);
          console.log(start);
    console.log("this is my test",end);

    }

    let historicData: any = {};                                                           //Storing the historic data
    localStorage.removeItem("historic");                                                  //Clean the LS to fill it again only if we could connect to DB
    for (let i = 0; i < totalDays; i++) { 
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


  
}
