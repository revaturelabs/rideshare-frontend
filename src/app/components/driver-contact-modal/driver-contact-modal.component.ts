import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { GoogleService } from 'src/app/services/google-service/google.service';

@Component({
  selector: 'app-driver-contact-modal',
  templateUrl: './driver-contact-modal.component.html',
  styleUrls: ['./driver-contact-modal.component.css']
})
export class DriverContactModalComponent implements OnInit {

  origin : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];

  @ViewChild('maps',null) mapElement: any;
  map: google.maps.Map;
  constructor(private http: HttpClient, private googleService: GoogleService) { }

  ngOnInit() {

    this.googleService.getGoogleApi();

    this.sleep(2000).then(() => {
     //show drivers on map
     this.showDriversOnMap(sessionStorage.getItem("origin"), sessionStorage.getItem("destination"));
     
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


  showDriversOnMap(origin, destination){
     
      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
       this.displayRoute(origin, destination, directionsService, directionsRenderer);
  
  }


displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      //avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

}
