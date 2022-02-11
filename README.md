# CriptoAPI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Applications used for this projects

EletronJS.
Developed in Visual Studio Code.

## Third parties frameworks

    * ngx-countdown: Simple fetaure to set a timer, I used this to improve the UX and .
    * Sweetalert: To alert the user when the connection with the server is broken, Sweetalert is a simple solution and it's not strictly related to the core function of the app, it just a UX improvment.

## UX | UI Design

The appication has of three main features:

1. On top of the main display we have the Current Exchange Rate for the Bitcoin in US Dollars, this feature has nested data such as:  
    1.1) In the middle of the box is placed the current or real time exchange rate which will be updated each 60 seconds.
   1.2) In the bottom left corner we have a 60 seconds counter, when it get to cero the app updates the current bitcoin value, this is an infinite loop.
   1.3) In the bottom right corner we have the las update date, this is an important feature since, might happen that the app or the API crashed and the exchange rate does not update, basically if there is a 202 request the date will be updated and the User will know the exact date and time the las request was successful. 1.4) An alert was added to the app that will pop up if the request to the API crashes, warning the user that the data could not be retrieve and communicating that the app will try again in 60 seconds, this alarm will automatically close in 4 seconds.
   ![Image text](../criptoAPI/src/assets/404.png)
2. On the bottom of the main display we have bitcoin's exchange rate history, it has on the top a search input and on the bottom a table with the information requested, by default on init the system will show the last 15 days, however the user can modify this query by using the search input on top.
   2.1) If the user wants to modify the default query, he will find on top an "Start Date" and "End Date" input, here he will enter the dates he wants for the query, in case he enter wrong information for example the "End Date" lower than the "Start Date" the app will alert the user with a popover in order to get a new correct request.
   ![Image text](../criptoAPI/src/assets/inputerror.png)
   2.2) We have then at the botton the table with the daily historic information, it contains the day of the query at left and the exchange value of that day at right.
3. Finally if the user wants to get more details about one specfic query, he will find next to the value per day in the previous explained table, a a link call "More Info.", if the user clicks on it, it will automatically show a toast with information about other currencies (COP and EUR) for that specfic day.

Color palette for this project can be found here: https://coolors.co/ffe74c-ff5964-ffffff-6bf178-35a7ff

## Testing

1. Current BTC exchange rate; for this test we will request manually and automatically the data to the API and compare if it works.
   1.1 Test success, we could not get the exact value since the API is constatly being updated, however both values were very close.
2. Exchange rate per day; we fetch manually information for three specific days, ["2022-2-10": $ 44416.39, "2022-2-1": $ 38492.53, "2022-1-27": $ 36846.22], then the data was requested via this application automatically (on init loading) and manually via the search input, for both the result was the same- success.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
