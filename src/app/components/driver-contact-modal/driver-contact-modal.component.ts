import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-driver-contact-modal',
  templateUrl: './driver-contact-modal.component.html',
  styleUrls: ['./driver-contact-modal.component.css']
})

/**
 * The DriverContactModel component
 */

export class DriverContactModalComponent implements OnInit {

    /**
   * Set orgin as a string.
   * Set mapProperties as an Array
   * Set availableCars as an Array
   * defines mapElement to any
   * Set map as google.maps.map
   * Instantiates a boolean
   */

  origin : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];

  @ViewChild('maps',null) mapElement: any;
  map: google.maps.Map;

    /**
   * This is the constructor
   * @param http Provides an instance of a HttpCLient.
   */

  constructor(private http: HttpClient) { }


   /**
   * This is an OnInit function that sets the GoogleAPI.
   * showDriversOnMap is initalized by sessionStorage Info.
   * set sleep to 2000 ms.
   * Once validated, it will initialize the fields.
   */

  ngOnInit() {

    this.getGoogleApi();

    this.sleep(2000).then(() => {
     //show drivers on map
     this.showDriversOnMap(sessionStorage.getItem("origin"), sessionStorage.getItem("destination"));

    });
  }

  /**
   * This function checks sleep timer
   * @param ms
   * @returns {Promise}
  */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * This function calls the google api
   * @param GoogleAPI
   * @returns {Promise}
   */
getGoogleApi()  {
    this.http.get(`${environment.loginUri}getGoogleApi`)
       .subscribe(
                 (response) => {
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

   /**
    * This function shows drivers on Google maps
    * @param origin
    * @param destination
    * @returns {displayRoute}
   */
  showDriversOnMap(origin, destination){

      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
       this.displayRoute(origin, destination, directionsService, directionsRenderer);

  }

/**
 * This function displays route from driver to endpoint
 * @param origin
 * @param destination
 * @param service
 * @param display
 * @returns {Response}
 */
displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
    }, 
    function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

}
