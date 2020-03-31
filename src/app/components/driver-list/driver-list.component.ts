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
import { element } from 'protractor';


export class Drivers {
    id: string;
    name: string;
    origin: string;
    address: string;
    email: string;
    phone: any;

}

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

export class DriverListComponent implements OnInit {

  location = 'Morgantown, WV';
  mapProperties: {};
  drivers: Array<any> = [];
  arr = [];
  tableColumns: string[] = ['name', 'distance', 'time', 'view'];
  reverseClicked = false;
  sortNumber = 0;

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.drivers = [];

    this.userService.getRidersForLocation1(this.location).subscribe(
      res => {
           // console.log(res);
           res.forEach((element: { userId: any; firstName: string; lastName: string; hCity: string; hState: string;
             email: any; phoneNumber: any; }) => {
              this.drivers.push({
                 id: element.userId,
                 name: element.firstName + " " + element.lastName,
                 origin: element.hCity + "," + element.hState,
                 email: element.email,
                 phone: element.phoneNumber
              });
          });
      });

    // this.drivers.push({'id': '1','name': 'Ed Ogeron','origin':'Reston, VA', 'email': 'ed@gmail.com', 'phone':'555-555-5555'});
    // this.drivers.push({'id': '2','name': 'Nick Saban','origin':'Oklahoma, OK', 'email': 'nick@gmail.com', 'phone':'555-555-5555'});
    // this.drivers.push({'id': '3','name': 'Bobbie sfsBowden','origin':'Texas, TX', 'email': 'bobbie@gmail.com', 'phone':'555-555-5555'});
    // this.drivers.push({'id': '4','name': 'Les Miles','origin':'New York, NY', 'email': 'les@gmail.com', 'phone':'555-555-5555'});
    // this.drivers.push({'id': '5','name': 'Bear Bryant','origin':'Arkansas, AR', 'email': 'bear@gmail.com', 'phone':'555-555-5555'});
    // console.log(this.drivers);
    this.getGoogleApi();

    this.sleep(2000).then(() => {
      this.mapProperties = {
         center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      // get all routes
      this.displayDriversList(this.location, this.drivers);
      // show drivers on map
      this.showDriversOnMap(this.location, this.drivers);

    });
  }



  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

getGoogleApi()  {
    this.http.get(`${environment.loginUri}getGoogleApi`)
       .subscribe(
                 (response) => {
                     // console.log(response);
                     if (response["googleMapAPIKey"] !== undefined) {
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

  showDriversOnMap(origin: string, drivers: any[]) {
     drivers.forEach((element: { origin: any; }) => {
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
      this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
  }


displayRoute(origin: any, destination: any, service: google.maps.DirectionsService, display: google.maps.DirectionsRenderer) {
    service.route({
      origin,
      destination,
      travelMode: 'DRIVING',
      // avoidTolls: true
    }, function(response: any, status: string) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }


  displayDriversList(origin: string, drivers: any[]) {

    console.log(drivers);
    let thingy = [];
    let origins = [];

    // set origin
    origins.push(origin);

    // const outputDiv = document.getElementById('output');

    drivers.forEach((element: { origin: string | google.maps.LatLng | google.maps.LatLngLiteral | google.maps.Place;
      name: any; id: any; email: any; phone: any; }) => {

        const service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
          {
            origins,
            destinations: [element.origin],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          },
          function(response, status) {
            console.log(response);
            if (status !== 'OK') {
              alert('Error was: ' + status);
            } else {
              this.drivers.address = response.originAddresses;
              this.drivers.destination = response.destinationAddresses;
              this.drivers.results = response.rows[0].elements;
              this.drivers.name =  element.name;

              const temp = {
                "html": `<tr><td class="col">${name}</td>
                                      <td class="col">${drivers.results[0].distance.text}</td>
                                      <td class="col">${drivers.results[0].duration.text}</td>
                                      <td class="col">
                                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered${element.id}"> View</button>
                                        <div class="col-lg-5">
                                        <div class="modal" id="exampleModalCentered${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
                                          <div class="modal-dialog modal-dialog-centered" role="document">
                                              <div class="modal-content">
                                                  <div class="modal-header">
                                                      <h5 class="modal-title" id="exampleModalCenteredLabel">Contact Info:</h5>
                                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                      </button>
                                                  </div>
                                                  <div class="modal-body">
                                                      <h1>${name}</h1>
                                                      <h3>Email: ${element.email}</h3>
                                                      <h3>Phone: ${element.phone}</h3>
                                                  </div>
                                                  <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                  </div>
                                                </div>
                                            </div>
                                          </div>
                                      </div>
                                      <div class="col-lg-6">
                                          <div #maps id="gmap" class="img-responsive"></div>
                                      </div>
                                    </td></tr>`,
                "time": drivers.results[0].duration.value,
              }

              // console.log(temp.time);

              thingy.push(temp);
              this.arr = thingy;
            } // else
          }
        ); // distance matrix param
      } // anon func
    ); // for each

    this.sleep(2000).then(() => {
        thingy = this.quickSort(thingy, true, this.sortNumber);
        this.sleep(1000).then(() => {
          this.show(thingy);
          this.arr = thingy;
        });
    });
  } //display function

  show(arr: any[]) {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    arr.forEach((ele: { [x: string]: string; }) => {
      outputDiv.innerHTML += ele["html"];
    });

  }

  reverse(sortNumber) {
    if (this.reverseClicked === false) {
      this.reverseClicked = true;
      this.arr = this.quickSort(this.arr, false, sortNumber);
    } else {
      this.reverseClicked = false;
      this.arr = this.quickSort(this.arr, true, sortNumber);
    }

    this.sleep(2000).then(() => {
      this.show(this.arr);
    });
  }

  quickSort(array: any[], desc: boolean, sortNumber: number) {

    if (array.length <= 1) { return array; }

    let pivot = array.shift();

    let left = [];
    let right = [];
    if (sortNumber === 1) {
    if (desc === true) {
      left = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["time"]) < parseInt(pivot["time"]);
      });
      right = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["time"]) >= parseInt(pivot["time"]);
      });
    } else {
      left = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["time"]) > parseInt(pivot["time"]);
      });
      right = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["time"]) <= parseInt(pivot["time"]);
      });
    }
  } else {
    if (desc === true) {
      left = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["distance"]) < parseInt(pivot["distance"]);
      });
      right = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["distance"]) >= parseInt(pivot["distance"]);
      });
    } else {
      left = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["distance"]) > parseInt(pivot["distance"]);
      });
      right = array.filter((el: { [x: string]: string; }) => {
        return parseInt(el["distance"]) <= parseInt(pivot["distance"]);
      });
    }

  }


    // right is larger numbers or equal
    // left is strictly less than pivot

    let leftSorted = this.quickSort(left, desc, sortNumber);
    let rightSorted = this.quickSort(right, desc, sortNumber);

    // console.log("left: " + leftSorted);
    // console.log("right: " + rightSorted);

    // console.log("... : " + [...rightSorted]);

    // console.log(pivot);
    // console.log([...leftSorted, pivot, ...rightSorted])

    return [...leftSorted, pivot, ...rightSorted];
  }

}
