import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';

interface IGoogleMapsAPIResponse {
  googleMapAPIKey: string;
}

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location = 'Morgantown, WV';
  location_s = '';
  mapProperties: {};
  availableCars: Array<any> = [];
  drivers: Array<any> = [];

  //AAA test
  allInfo = [];

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService) { }
  // load google map api
  ngOnInit() {
    this.drivers = [];
    this.getGoogleApi();

    this.userService.getRidersForLocation2(this.location).subscribe(
      res => {
        // console.log("res: " + JSON.stringify(res[0]));
        // Anvar trying fix 'undefined' preceding userId
        res.forEach(element => {
          // console.log("element: " + element.userId)
          this.drivers.push({
            id: element.userId,
            name: element.firstName + ' ' + element.lastName,
            origin: element.hCity + ',' + element.hState,
            email: element.email,
            phone: element.phoneNumber,
            seats: element.seats
          });
        });
        // console.log("drivers " + JSON.stringify(this.drivers))

        
          this.mapProperties = {
            center: new google.maps.LatLng(Number(sessionStorage.getItem('lat')), Number(sessionStorage.getItem('lng'))),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
          // get all routes
          this.displayDriversList(this.location, this.drivers);
          // show drivers on map
          this.showDriversOnMap(this.location, this.drivers);
        

      }
      
      );

    // Why are we sleeping instead using callbacks/observables?
    // this.sleep(2000).then(() => 
    
    // {
    //   this.mapProperties = {
    //     center: new google.maps.LatLng(Number(sessionStorage.getItem('lat')), Number(sessionStorage.getItem('lng'))),
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    //   this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
    //   // get all routes
    //   this.displayDriversList(this.location, this.drivers);
    //   // show drivers on map
    //   this.showDriversOnMap(this.location, this.drivers);
    // }
    
    // );
  }

  // sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  getGoogleApi() {
    this.http.get<IGoogleMapsAPIResponse>(`${environment.loginUri}getGoogleApi`)
      .subscribe(
        (response) => {
          if (response.googleMapAPIKey !== undefined) {
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

  searchDriver() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
    this.userService.getRidersForLocation1(this.location_s)
      .subscribe(
        (response) => {
          response.forEach(element => {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              draggable: true,
              map: this.map
            });
            this.displayRoute(this.location_s, element.hCity + ',' + element.hState, directionsService, directionsRenderer);
          });
        });
  }

  showDriversOnMap(origin, drivers) {
    drivers.forEach(element => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map
      });
      this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
  }


  displayRoute(origin, destination, service, display) {
    service.route({
      origin,
      destination,
      travelMode: 'DRIVING',
    }, (response, status) => {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  // TODO: Refactor. It is not appropriate to conduct direct DOM manipulation in this way with Angular.
  displayDriversList(origin, drivers) {

    // console.log('origin: ' + origin);
    // console.log('drivers: ' + drivers);
    // console.log("drivers from this: " + this.drivers);

    const origins = [];
    origins.push(origin);

    // const outputDiv = document.getElementById('output');

    drivers.forEach(element => {

      // console.log("each driver: " + JSON.stringify(element));
      // each driver object

      const service = new google.maps.DistanceMatrixService();

        /**
         * AAA
         * 
         * Google's Distance Matrix service computes travel distance and journey duration 
         * between multiple origins and destinations using a given mode of travel.
         * 
         * 
         */

        service.getDistanceMatrix({
        // origins: address for origin. It is a string in our case. Can be array of Lat, Long, etc.
        origins,
        // each driver has origin key that points to their address (string)
        destinations: [element.origin],
        // mode to use when calculating 'nearest' kind of direction
        travelMode: google.maps.TravelMode.DRIVING,
        // well
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
        // this is a CB that gets called once Google responds
      }, (response, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          
          // on success, for each driver, do this:
          // console.log("response: " + JSON.stringify(response));

          /**
           * AAA
           * 
           * The architecture of Response is as following:
           * 
           * NOTE: 'rows' is an array where each row corresponds to an origin.
           *        Since we are dealing with SINGLE origin, we can only have 
           *        value at rows[0]. 
           * 
           * {
           *  originAddress: [],
           *  destinationAddress: [],
           *  rows: [
           *       {
              *        status: OK,
              *        duration: {
              *            value: 123123,
              *            text: 19 hours 40 mins
              *        },
              *        distance: {
              *            value: 123,
              *            text: 50 mi
              *        }
           *        },
           * 
           *        {},
           *        {},
           *        etc
           *    ]
           * }
           */

          const originList = response.originAddresses;
          const destinationList = response.destinationAddresses;
          // results is Array of objects. Each object has status, duration, and distance.
          // in our case, there is only 1 object since there is only 1 destination. Voila.
          const results = response.rows[0].elements;
          // driver's name (full name)
          const name = element.name;
          // driver's car's number of seats
          const seats = element.seats;

          // AAA: How about storing all this info in an array with object. So we can use 
          // Angular instead of this atrocity.

          this.allInfo.push({
            "origin": originList,
            "destinationList": destinationList,
            "results": results,
            "user": {
              "name": name,
              "email": element.email,
              "phone": element.phone
            },
            "seats": seats,
          });

        }


      });
    });

    // this.sleep(7000).then(() => console.log("most imp: " + JSON.stringify(this.allInfo)));

  }
}
