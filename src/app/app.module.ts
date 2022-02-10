import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// ----------------- DATA FETCH
import { HttpClientModule } from '@angular/common/http';
// ----------------- COMPONENTS

import { AppComponent } from './app.component';
import { HomeComponent } from './windows/home/home.component';
import { DetailComponent } from './windows/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
