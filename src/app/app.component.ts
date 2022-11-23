import { Component } from '@angular/core';
import {} from 'googlemaps';


/**
 * This is the App Component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * This is the title of the Application.
   */
  title = 'rideshare-frontend';
  googleMapAPIKey: string;

  constructor() { }

  ngOnInit() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
        sessionStorage.setItem("lat", position.coords.latitude+""),
        sessionStorage.setItem("lng", position.coords.longitude+"")
     })
  }
 } 


   


}
