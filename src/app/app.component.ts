import { Component } from '@angular/core';
import {} from 'googlemaps';
import { GoogleApiService } from './services/google-api.service';



/**
 * This is the App Component.
 */



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Revature RideForce';
  googleMapAPIKey: string;

  constructor(private googleApi:GoogleApiService) { }



  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        sessionStorage.setItem("lat", position.coords.latitude + "");
        sessionStorage.setItem("lng", position.coords.longitude + "");
      })
    }  
  }



}