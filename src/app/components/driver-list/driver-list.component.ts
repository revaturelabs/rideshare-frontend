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

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  origin : string ='Morgantown, WV';
  destination : string ='';

  mapProperties :{};
  availableCars : Array<any> = [];

  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.availableCars = [];
    this.availableCars.push({'Name': 'Ed Ogeron','Distance':'Reston, VA', 'Time':'10:45'});
    this.availableCars.push({'Name': 'Nick Saban','Distance':'Oklahoma, OK', 'Time':'18:55'});
    this.availableCars.push({'Name': 'Bobbie Bowden','Distance':'Texas, TX', 'Time':'06:15'});
    this.availableCars.push({'Name': 'Les Miles','Distance':'New York, NY', 'Time':'19:45'});
    this.availableCars.push({'Name': 'Bear Bryant','Distance':'Arkansas, AR', 'Time':'11:45'});
    console.log(this.availableCars);
    this.mapProperties = {
      center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
  }

  getDirection(destination: string){
    //refresh
    this.ngOnInit();
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map
    });
    console.log(this.origin+"  &  "+destination);
    this.displayRoute(this.origin, destination, directionsService, directionsRenderer);

  }


displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
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


}
