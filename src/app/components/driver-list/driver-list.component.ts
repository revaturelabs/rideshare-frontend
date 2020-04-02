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
import { GoogleService } from 'src/app/services/google-service/google.service';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { listenToTriggers } from 'ngx-bootstrap/utils/triggers';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  homeLocation : string = '';
  workLocation: string = '';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];
  driversList: Array<any> = [];
  distance: Array<any> = [];
  time: Array<any> = [];
  range: number = 5;
  sameOffice: boolean = true;



  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient,private userService: UserService,
    private googleService: GoogleService) { }

  ngOnInit() {

    //Retriving

    console.log("User Id: "+sessionStorage.getItem('userid'));
    console.log("Home: "+sessionStorage.getItem('hAddress'));
    console.log("Work: "+sessionStorage.getItem('wAddress'));

    this.homeLocation = sessionStorage.getItem('hAddress');
    this.workLocation = sessionStorage.getItem('wAddress');

    this.googleService.getGoogleApi();

    this.searchDriver();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


   searchDriver(){
    //call service search algorithm ()
    console.log("searching for Drivers");
    console.log("Range "+ this.range);
    console.log("Same Office "+ this.sameOffice);
    this.drivers = [];

    this.userService.getRidersForLocation1(this.homeLocation, this.workLocation, this.range, this.sameOffice).subscribe(
      res => {
           res.forEach(element => {
            console.log("Driver: " + res);
            this.drivers.push({
                   'id': element.userId,
                 'name': element.firstName+" "+element.lastName,
               'origin':element.hAddress+","+element.hCity+","+element.hState,
                'email': element.email,
                'phone':element.phoneNumber
              });
          });
           console.log(this.drivers);

           this.emptyDriversList();

          this.emptyDriversList();

          this.displayDriversList(this.homeLocation, this.drivers);

      });


      //get all routes
      this.sleep(2000).then(() => {
        this.mapProperties = {
           center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
           zoom: 15,
           mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
        //empty drivers list
        //show drivers on map
        this.showDriversOnMap(this.homeLocation, this.drivers);
      });

   }

  showDriversOnMap(origin, drivers) {
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

displayDriversList(origin, drivers) {
  let list = [];
  let distance = [];
  let time = [];

    let  origins = [];
    //set origin
    origins.push(origin)

    var outputDiv = document.getElementById('output');
    drivers.forEach(element => {

      console.log("Element "+element.name);


      // this.sleep(2000).then(() => {
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix(
        {
        origins: origins,
        destinations: [element.origin],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, callback);

      function callback(response, status) {
        if (status !== 'OK') {
          alert('Google API Error: ' + status);
        } else {
          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var results = response.rows[0].elements;
          var seats;
          console.log("Element After "+element.name);
          list.push(element);
          distance.push(results[0].distance);
          time.push(results[0].duration);

          var name =  element.name;
          outputDiv.innerHTML += `<tr><td class="col">${name}</td>
                                  <td class="col">${results[0].distance.text}</td>
                                  <td class="col">${results[0].duration.text}</td>
                                  <td class="col">${seats}</td>
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
                                                  <h1 style="color: #f16a2c;">${name}</h1>
                                                  <span class="text-muted">Email: </span><h3>${element.email}</h3>
		                                              <span class="text-muted">Phone: </span><h3>${element.phone}</h3>
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
                                </td></tr>`;
      }
    }



    });
  console.log (list);
  console.log(distance);
  console.log(time);

  this.time = time;
  this.distance = distance;
  this.driversList = list;


    this.time = time;
    this.distance = distance;
    this.driversList = list;



    // });


}

emptyDriversList() {


  var outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ``;


}

sortByName() {
  console.log("Sorting By Name");
  this.emptyDriversList();

  console.log(this.driversList);
  console.log(this.time);
  console.log(this.distance);

  let dr = [];
  //CREATE ARRAY OF NAMES.
  this.driversList.forEach(d =>{ dr.push(d.name);})
  console.log("Unsorted: " +dr);

  const drClone  = Object.assign([], dr);
  console.log("Clone: " + drClone);


  let sortDr = dr.sort();
  console.log(sortDr);

  let index = [];
  sortDr.forEach(s => { index.push(drClone.indexOf(s)); });
  console.log(index);


  let mark = 0;
  var outputDiv = document.getElementById('output');
  sortDr.forEach(sDr => {


      outputDiv.innerHTML += `<tr><td class="col">${sDr}</td>
      <td class="col">${this.distance[index[mark]].text}</td>
      <td class="col">${this.time[index[mark]].text}</td>
      <td class="col">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered${this.driversList[index[mark]].id}"> View</button>
        <div class="col-lg-5">
        <div class="modal " id="exampleModalCentered${this.driversList[index[mark]].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content ">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenteredLabel">Contact Info:</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                  </div>
                  <div class="modal-body">
                  <h1 style="color: #f16a2c;">${this.driversList[index[mark]].name}</h1>
                  <span class="text-muted">Email: </span><h3>${this.driversList[index[mark]].email}</h3>
		              <span class="text-muted">Phone: </span><h3>${this.driversList[index[mark]].phone}</h3>
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
    </td></tr>`;
    mark++

  })





}

sortByDistance() {
  this.emptyDriversList();

  console.log(this.driversList);
  console.log(this.time);
  console.log(this.distance);

  let ds = [];
  //CREATE ARRAY OF Distances.
  this.distance.forEach(d =>{ ds.push(Number(d.value));})
  console.log("Unsorted: " +ds);

  const dsClone  = Object.assign([], ds);
  console.log("Clone: " + dsClone);

  let sortDs = ds.sort((a, b) => a - b); // For ascending sort
  console.log(sortDs);

  let index = [];
  sortDs.forEach(s => { index.push(dsClone.indexOf(s)); });
  console.log(index);

  let mark = 0;
  var outputDiv = document.getElementById('output');
  sortDs.forEach(sDr => {


      outputDiv.innerHTML += `<tr><td class="col">${this.driversList[index[mark]].name}</td>
      <td class="col">${this.distance[index[mark]].text}</td>
      <td class="col">${this.time[index[mark]].text}</td>
      <td class="col">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered${this.driversList[index[mark]].id}"> View</button>
        <div class="col-lg-5">
        <div class="modal" id="exampleModalCentered${this.driversList[index[mark]].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenteredLabel">Contact Info:</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                  </div>
                  <div class="modal-body">
                  <h1 style="color: #f16a2c;">${this.driversList[index[mark]].name}</h1>
                  <span class="text-muted">Email: </span><h3>${this.driversList[index[mark]].email}</h3>
		              <span class="text-muted">Phone: </span><h3>${this.driversList[index[mark]].phone}</h3>
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
    </td></tr>`;
    mark++

  })





}


}
