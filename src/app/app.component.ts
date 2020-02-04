import { Component } from '@angular/core';
import {} from 'googlemaps';
<<<<<<< HEAD

=======
>>>>>>> 97cd434feda233f12368e4e5692cfae7bef50e84
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


  ngOnInit() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
        sessionStorage.setItem("lat", position.coords.latitude+""),
        sessionStorage.setItem("lng", position.coords.longitude+"")
     });
  }
 } 


}
