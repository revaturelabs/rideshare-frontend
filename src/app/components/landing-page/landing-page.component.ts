import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  origin : string ='';
  destination : string ='';

  mapProperties :{};

  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.mapProperties = {
      center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
  }

  getDirection(){
    //refresh
    this.ngOnInit();
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map
    });
    console.log(this.origin+"  &  "+this.destination);
    this.displayRoute(this.origin, this.destination, directionsService, directionsRenderer);

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
