import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CountdownModule } from 'ngx-countdown';

// ----------------- DATA FETCH
import { HttpClientModule } from '@angular/common/http';
// ----------------- COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './windows/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
