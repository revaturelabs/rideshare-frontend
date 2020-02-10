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

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  origin : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];


  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.drivers = [];
    this.drivers.push({'name': 'Ed Ogeron','origin':'Reston, VA', 'email': 'ed@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'name': 'Nick Saban','origin':'Oklahoma, OK', 'email': 'nick@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'name': 'Bobbie sfsBowden','origin':'Texas, TX', 'email': 'bobbie@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'name': 'Les Miles','origin':'New York, NY', 'email': 'les@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'name': 'Bear Bryant','origin':'Arkansas, AR', 'email': 'bear@gmail.com', 'phone':'555-555-5555'});
    //console.log(this.drivers);

    this.getGoogleApi();

    this.sleep(2000).then(() => {
      this.mapProperties = {
         center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      //get all routes 
      this.displayDriversList(this.origin, this.drivers);
      //show drivers on map
      this.showDriversOnMap(this.origin, this.drivers);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
getGoogleApi()  {
    this.http.get(`http://localhost:8080/login/getGoogleApi`)
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

  getDirection(){
     

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
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var results = response.rows[0].elements;
          //console.log(originList[0] + ' to ' + destinationList[0]);
          var name =  element.name;
          outputDiv.innerHTML += `<tr><td class="col">${name}</td>
                                  <td class="col">${results[0].distance.text}</td>
                                  <td class="col">${results[0].duration.text}</td>
                                  <td class="col">
                                  <button (click)="view(${element.name}, ${element.email}, ${element.phone})" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered"> View</button>
                                  <div id="view"></div>
                                  </td></tr>`;
      }
    });
    
   });
}


view(name, email, phone){
  console.log(name);
  var view = document.getElementById('view');
  view.innerHTML=`<div class="modal" id="exampleModalCentered" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
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
                 <h3>Email: ${email}</h3>         
                 <h3>Phone: ${phone}</h3>                 
               </div>
               <div class="col-lg-6">
               <h4>Directions:</h4>
               <div #map id="gmap" class="img-responsive"></div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
           </div>
        </div>
    </div>`
}

}
