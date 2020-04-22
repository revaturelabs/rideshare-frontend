import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { GoogleApiService } from 'src/app/services/google-api.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location: string = '';
  mapProperties: {};
  availableCars: Array<any> = [];
  availableSeats: Array<any> = [];
  drivers: Array<any> = [];
  //In miles
  maxDistance: number = 60;
  //In mins
  maxTime: number = 60;
  minAvailableSeats: number = 1;

  displayedColumns: string[] = ['name', 'distance', 'seats', 'duration', 'modal'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('map', null) mapElement: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  map: google.maps.Map;

  constructor(private http: HttpClient,private userService: UserService, private carService: CarService,private googleApi:GoogleApiService) { }

  ngOnInit() {

    // set user location to home location
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
      user => {
        // this can be changed if needed
        // to switch to batch location simply set location = user.batch.batchLocation
        this.location = user.hAddress + "," + user.hCity + "," + user.hState;
      }
    );

    this.drivers = [];

    // retrieve drivers from the backend, then modify the result object to fit needs of the component.
    this.userService.getAllDrivers().subscribe(
      res => {
        //console.log(res);
        res.forEach(element => {
          this.drivers.push({
            'id': element.userId,
            'modalButtonId': `#modal${element.userId}`,
            'modalId': `modal${element.userId}`,
            'name': `${element.firstName} ${element.lastName}`,
            'origin': `${element.hAddress},${element.hCity},${element.hState}`,
            'email': element.email,
            'phone': element.phoneNumber,
            'seats': element.car.seats
          });
        });

        // set the Material Table DataSource to be the modified driver list
        this.dataSource.data = this.drivers;
      });

    this.getGoogleApi();

    // wait for 2 seconds to retrieve the API key, then query the Google Maps API
    this.sleep(2000).then(() => {
      this.mapProperties = {
        center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);

      this.separateApiCalls(this.location, this.drivers);
    });

    // connect the paginator and sorting elements to the dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // since all data is stored as a string, need to convert data in the column to a unified format when sorting
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'distance': {
          return this.distanceInMiles(item)
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

    // since all data is stored as a string, need to convert data to appropriate formats to filter
    this.dataSource.filterPredicate = (data, filter) => {

      let values = filter.split(" ");
      let maxDistance = Number(values[0]);
      let maxTime = Number(values[1]);
      let minAvailableSeats = Number(values[2]);

      let value: boolean = true;

      if (this.maxDistance > 0) {
        value = value && this.distanceInMiles(data) <= maxDistance;
      }
      if (this.maxTime > 0) {
        value = value && this.durationInMins(data) <= maxTime;
      }
      if (this.minAvailableSeats > 0) {
        value = value && data["seats"] >= minAvailableSeats;
      }
      return value;
    }

  }

  /**
   * execute a function after a number of milliseconds
   * @param ms the number of milliseconds to wait for
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
getGoogleApi()  {

  this.googleApi.getGoogleApi();
    // this.http.get(`${environment.loginUri}getGoogleApi`)
    //    .subscribe(
    //              (response) => {
    //                  //console.log(response);
    //                  if(response["googleMapAPIKey"] != undefined){
    //                      new Promise((resolve) => {
    //                        let script: HTMLScriptElement = document.createElement('script');
    //                        script.addEventListener('load', r => resolve());
    //                        script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
    //                        document.head.appendChild(script);      
    //                  }); 
    //            }    
    //        }
    //    );
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

  /**
   * calculate and display the route from the origin address to the destination address
   * @param origin the starting point of the trip. taken from the user's home address
   * @param destination the end point of the trip. taken from a driver's home address.
   * @param service Google Maps API DirectionsService object
   * @param display Google Maps API DirectionsRenderer object
   */
  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      //avoidTolls: true
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  /**
   * convert data stored in teh table's "Duration" column to a number of minutes
   * @param item the table row to be accessed
   */
  durationInMins(item) {
    // split the trip duration into length and units of time
    let splitDur = item['duration'].split(' ');
    let durInMinutes = 0;
    for (let i = 1; i < splitDur.length; i += 2) {
      // splitDur[i] represents the unit of time, use this to determine how to convert the quantity into minutes.
      if (splitDur[i].includes('d'))
        durInMinutes += Number(splitDur[i - 1]) * 1440;
      else if (splitDur[i].includes('h'))
        durInMinutes += Number(splitDur[i - 1]) * 60;
      else
        durInMinutes += Number(splitDur[i - 1])
    }
    return durInMinutes;
  }

  /**
   * convert data stored in the table's "Distance" column to a number of miles
   * @param item the table row to be accessed
   */
  distanceInMiles(item) {
    // remove everything that's not a number or decimal point, then convert to a number in miles.
    if (item['distance'].includes('f'))
      return Number(item['distance'].replace(/[^0-9.]/g, '')) / 5280;
    else
      return Number(item['distance'].replace(/[^0-9.]/g, ''));
  }

  /**
   * calculate distance and duration of trip based on logged in user for each driver
   * @param origin the starting point of the trip. taken from the user's home address
   * @param drivers the list of drivers to calculate for
   */
  displayDriversList(origin, drivers) {
    let origins = [];
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
      }, function (response, status) {
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

  /**
   * this function updates the filter string based on the user's inputs. In order for material to filter the table, dataSource.filter must be changed.
   */
  applyFilter() {
    this.dataSource.filter = this.maxDistance + " " + this.maxTime + " " + this.minAvailableSeats;
  }

  /**
   * the purpose of ths function is to display all the drivers' distance/duration on the table without going over GoogleMaps allotted queries per second limit
   * the function runs recursively to make use of the sleep function defined above. starting index is where we start to slice the driver array from
   * @param origin the starting point of the trip. taken from the user's home address
   * @param drivers the list of drivers to calculate for
   * @param startingIndex index of drivers to begin the slice from, starts at 0 for initial call
   */
  separateApiCalls(origin, drivers, startingIndex = 0) {
    // calculate the end index for the slice. if it is longer than the length of drivers, slice will only take the remaining elements.
    let endIndex = startingIndex + 5;

    // separate the array of drivers
    let driversSlice = drivers.slice(startingIndex, endIndex);

    // use API functions described above to calculate distance, duration, and display on the map.
    this.showDriversOnMap(origin, driversSlice);
    this.displayDriversList(origin, driversSlice);

    // if there are more drivers in the array, call this function again with startingIndex equal to endIndex after 2.4 seconds.
    if (endIndex < drivers.length)
      this.sleep(2400).then(() => this.separateApiCalls(origin, drivers, endIndex));
  }
}
