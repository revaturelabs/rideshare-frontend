import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';
import {MatSortModule} from '@angular/material/sort';

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

  dataToDisplay = [];

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {

    this.getGoogleApi();

    this.userService.getRidersForLocation2(this.location)
      .subscribe(
        // Data is array of objects. Each object has keys relevant to car and users key that holds user object
        (data) => {
          data.forEach(carOwner => {
            // console.log("data: " + JSON.stringify(carOwner))
            this.drivers.push({
              id: carOwner.user.userId,
              name: carOwner.user.firstName + ' ' + carOwner.user.lastName,
              origin: carOwner.user.hCity + ',' + carOwner.user.hState,
              email: carOwner.user.email,
              phone: carOwner.user.phoneNumber,
              seats: carOwner.seats
            });
          });

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
  }

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
        }
      );
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
    service
      .route({
        origin,
        destination,
        travelMode: 'DRIVING',
      }, 
      (response, status) => {
        if (status === 'OK') {
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
        }
      );
  }

  displayDriversList(origin, drivers) {

    const origins = [];
    origins.push(origin);

    drivers.forEach((element) => {

      const service = new google.maps.DistanceMatrixService();

        /**
         * 
         * Google's Distance Matrix service computes travel distance and journey duration 
         * between multiple origins and destinations using a given mode of travel.
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
          } 
          else {
            
            // on success, for each driver, do this:
          
            /**
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
            // console.log("seats: " + seats);

            this.dataToDisplay.push({
              "itemLabel": `exampleModalCentered${element.id}`,
              "origin": originList,
              "destinationList": destinationList,
              "results": results,
              "user": {
                "id": element.id,
                "name": name,
                "email": element.email,
                "phone": element.phone
              },
              "seats": seats,
            });
          }
        }
      );
    });
  }
}