import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Batch } from 'src/app/models/batch';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location : String = 'Houston, TX';
  mapProperties :{};
  availableCars : Array<any> = [];
  availableSeats: Array<any> = [];
  drivers : Array<any> = [];
  //In miles
  maxDistance : number = 60;
  //In mins
  maxTime : number = 60;
  minAvailableSeats: number = 1;

  displayedColumns: string[] = ['name', 'distance', 'seats', 'duration', 'modal'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('map',null) mapElement: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  map: google.maps.Map;

  constructor(private http: HttpClient,private userService: UserService, private carService: CarService) { }

  ngOnInit() {

    //set user location to home location
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
      user => {
        //this can be changed if needed
        //to switch to batch location simply set location = user.batch.batchLocation
        this.location = user.hAddress + "," +user.hCity + "," + user.hState;
      }
      );
    this.drivers = [];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.userService.getAllDrivers().subscribe(
      res => {
           //console.log(res);
           res.forEach(element => {
              this.drivers.push({
                'id': element.userId,
                'modalButtonId': `#modal${element.userId}`,
                'modalId': `modal${element.userId}`,
                'name': element.firstName+" "+element.lastName,
                'origin':element.hCity+","+element.hState,
                'email': element.email,
                'phone':element.phoneNumber,
                'seats': element.car.seats

              });
          });

      });

    this.getGoogleApi();

    this.sleep(2000).then(() => {
      this.mapProperties = {
         center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      //get all routes
      this.displayDriversList(this.location, this.drivers);

      this.dataSource.data = this.drivers;

      // since all data is stored as a string, need to convert data in the column to a unified format when sorting
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'distance': {
            // remove everything that's not a number or decimal point, then convert to a number.
            return Number(item[property].replace(/[^0-9.]/g, ''));
          }
          case 'duration': {
            return this.durationInMins(item)
          }
          default: {
            // all other columns are readily sortable, don't change their format.
            return item[property];
          }
        }
      }

      //show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
    });

    this.dataSource.filterPredicate = (data, filter) => {

      let values = filter.split(" ");
      let maxDistance = Number(values[0]);
      let maxTime = Number(values[1]);
      let minAvailableSeats = Number(values[2]);

      let value:boolean = true;

      if (this.maxDistance > 0){
        value = value && Number(data["distance"].replace(/[^0-9.]/g, '')) <= maxDistance;
      }
      if (this.maxTime > 0){
        value = value && this.durationInMins(data) <= maxTime;
      }
      if(this.minAvailableSeats > 0){
        value = value && data["seats"] >= minAvailableSeats;
      }
      return value;
    }

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

getGoogleApi()  {
    this.http.get(`${environment.loginUri}getGoogleApi`)
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

  showDriversOnMap(origin, drivers){
     drivers.forEach(element => {
      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
       this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
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

durationInMins(item){
  // split the trip duration into length and units of time
  let splitDur = item['duration'].split(' ');
  let durInMinutes = 0;
  for(let i = 1; i < splitDur.length; i+=2) {
    // splitDur[i] represents the unit of time, use this to determine how to convert the quantity into minutes.
    if(splitDur[i].includes('d'))
      durInMinutes += Number(splitDur[i-1]) * 1440;
    else if (splitDur[i].includes('h'))
      durInMinutes += Number(splitDur[i-1]) * 60;
    else
      durInMinutes += Number(splitDur[i-1])
  }
  return durInMinutes;
}

displayDriversList(origin, drivers) {
    let  origins = [];
    //set origin
    origins.push(origin)

    var outputDiv = document.getElementById('output');
    drivers.forEach(element => {

      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: origins,
        destinations: [element.origin],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var results = response.rows[0].elements;

          element.distance = results[0].distance.text;
          element.duration = results[0].duration.text;

      }
    });

   });
}
  applyFilter(){
    this.dataSource.filter = this.maxDistance + " " + this.maxTime + " "+ this.minAvailableSeats;
  }

}
