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
    this.getDate();
  }
  //Find current date
  // todate: any = new Date();
  todayDate: any = new Date();
  defStartDate: any = new Date();
  endDate: any = new Date();
  startDate: any = new Date();
  getDate() {
    this.defStartDate.setDate(this.todayDate.getDate() - 15);
    console.log(this.todayDate);
    console.log(this.defStartDate);
    this.endDate = this.todayDate.getFullYear()+'-'+(this.todayDate.getMonth()+1)+'-'+this.todayDate.getDate();
    this.startDate = this.defStartDate.getFullYear()+'-'+(this.defStartDate.getMonth()+1)+'-'+this.defStartDate.getDate();
    console.log(this.endDate);
    console.log(this.startDate);
  }
  
  viewLoadList: boolean = true;
  
  getCurrent(){
      this.coinbaseService.getCurrent().subscribe((previousValue) => {  
      console.log(previousValue);
    }, error =>{
      console.log(error);
    })
  }
    getPrevious(){
    this.coinbaseService.getPrevious("2022-02-01").subscribe((previousValue) => {  
      console.log(previousValue);
      this.saveDate(previousValue)
    }, error =>{
      console.log(error);
    })
  }
  //Store the data in the LS in order to have it available when the network crashes
   totalDates: any;
    saveDate(date: any) {
    if(localStorage.getItem("dates") == null){
      this.totalDates = [];
      this.totalDates.push(date);
      localStorage.setItem("dates", JSON.stringify(this.totalDates));
    }else{
      this.totalDates = JSON.parse(localStorage.getItem("dates")!);
      this.totalDates.push(date);
      localStorage.setItem("dates", JSON.stringify(this.totalDates))};
    }

}
