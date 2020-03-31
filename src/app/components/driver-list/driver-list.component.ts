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

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

/**
 * The DriverContactModel component
 */

export class DriverListComponent implements OnInit {

  /**
   * sets location to string
   * sets mapProperties
   * sets avaibleCars to Array
   * sets drivers to Array
   * @type {string}
   * @memberof DriverListComponent
   */
  location : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];


  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  /**
   * This is a constructor
   * Creates an instance of DriverListComponent.
   * @param {HttpClient} http
   * @param {UserService} userService
   * @memberof DriverListComponent
   */
  constructor(private http: HttpClient,private userService: UserService) { }

  /**
   * on init is calls on location of user
   * pushes information to driver
   * @memberof DriverListComponent
   */
  ngOnInit() {
    this.drivers = [];

    this.userService.getRidersForLocation1(this.location).subscribe(
      res => {
           //console.log(res);
           res.forEach(element => {
              this.drivers.push({
                   'id': element.userId,
                 'name': element.firstName+" "+element.lastName,
               'origin':element.hCity+","+element.hState,
                'email': element.email,
                'phone':element.phoneNumber
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
      this.displayDriversList(this.location, this.drivers);
      this.showDriversOnMap(this.location, this.drivers);
    });
  }
  /**
   *
   *
   * @param {*} ms
   * @returns
   * @memberof DriverListComponent
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

/**
 * This function calls the Google api
 *
 * @memberof DriverListComponent
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
   * This function shows drivers on the map
   *
   * @param {*} origin
   * @param {*} drivers
   * @memberof DriverListComponent
   */
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
 * This function shows the route from the driver to endpoint
 *
 * @param {*} origin
 * @param {*} destination
 * @param {*} service
 * @param {*} display
 * @memberof DriverListComponent
 */
displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

/**
 * This function populates a list of drivers on the page
 *
 * @param {*} origin
 * @param {*} drivers
 * @memberof DriverListComponent
 */
displayDriversList(origin, drivers) {
    let  origins = [];
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
          var name =  element.name;
          outputDiv.innerHTML += `<tr><td class="col">${name}</td>
                                  <td class="col">${results[0].distance.text}</td>
                                  <td class="col">${results[0].duration.text}</td>
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
                                </td></tr>`;
      }
    });

   });
}

}
