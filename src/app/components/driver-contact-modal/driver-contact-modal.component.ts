import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.getGoogleApi();

    this.sleep(2000).then(() => {
     //show drivers on map
     this.showDriversOnMap(sessionStorage.getItem("origin"), sessionStorage.getItem("destination"));
     
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
getGoogleApi()  {
    this.http.get(`http://54.174.82.153:8080/login/getGoogleApi`)
       .subscribe(
                 (response) => {
                     //console.log(response);
                     if(response["googleMapAPIKey"] != undefined){
                         new Promise((resolve) => {
                           let script: HTMLScriptElement = document.createElement('script');
                           script.addEventListener('load', r => resolve());
                           script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
                           document.head.appendChild(script);      
                     }); 
               }    
           }
       );
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
