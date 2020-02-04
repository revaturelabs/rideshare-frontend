import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  origin : string ='Morgantown, WV';
  destination : string ='';

  mapProperties :{};
  availableCars : Array<any> = [];

  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.availableCars = [];
    this.availableCars.push({'Name': 'Tom Tom','Distance':'Reston, VA', 'Time':'10:45'});
    this.availableCars.push({'Name': 'Tim Tim','Distance':'Oklahoma, OK', 'Time':'18:55'});
    this.availableCars.push({'Name': 'Tom Tom','Distance':'Texas, TX', 'Time':'06:15'});
    this.availableCars.push({'Name': 'Tam Tam','Distance':'New York, NY', 'Time':'19:45'});
    this.availableCars.push({'Name': 'Tem Tem','Distance':'Arkansas, AR', 'Time':'11:45'});
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
