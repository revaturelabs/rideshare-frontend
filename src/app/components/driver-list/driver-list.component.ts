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
export class DriverListComponent implements OnInit {

  homeLocation : string = '';
  workLocation: string = '';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];


  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient,private userService: UserService) { }

  ngOnInit() {
    this.drivers = [];

    //Retriving 

    console.log("User Id: "+sessionStorage.getItem('userid'));
    console.log("Home: "+sessionStorage.getItem('hAddress'));
    console.log("Work: "+sessionStorage.getItem('wAddress'));

  
    this.homeLocation = sessionStorage.getItem('hAddress');
    this.workLocation = sessionStorage.getItem('wAddress');


    this.userService.getRidersForLocation1(this.homeLocation).subscribe(
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
      //get all routes 
      this.emptyDriversList(this.homeLocation, this.drivers);

      this.displayDriversList(this.homeLocation, this.drivers);
      //show drivers on map
      this.showDriversOnMap(this.homeLocation, this.drivers);
    });
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

   searchDriver(){
    //call service search algorithm ()
    //console.log(this.location_s);
    this.drivers = [];
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
    this.userService.getRidersForLocation1(this.homeLocation)
    .subscribe(
              (response) => {
                response.forEach(element => {
                     var directionsService = new google.maps.DirectionsService;
                     var directionsRenderer = new google.maps.DirectionsRenderer({
                           draggable: true,
                           map: this.map
                      });
                      console.log(element.Distance);
                      this.displayRoute(this.homeLocation, element.hCity+","+element.hState, directionsService, directionsRenderer);
           });
    });

    this.userService.getRidersForLocation1(this.homeLocation).subscribe(
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


    this.sleep(2000).then(() => {
      this.mapProperties = {
         center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      //get all routes 
      this.emptyDriversList(this.homeLocation, this.drivers);
      this.displayDriversList(this.homeLocation, this.drivers);
      //show drivers on map
      this.showDriversOnMap(this.homeLocation, this.drivers);
    });

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
          //console.log(results[0].distance.text);
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

emptyDriversList(origin, drivers) {
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
        //console.log(results[0].distance.text);
        var name =  element.name;
        outputDiv.innerHTML = ``;
    }
  });
  
 });
}


}
