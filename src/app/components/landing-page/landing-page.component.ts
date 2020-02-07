import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('map', {static: true}) mapElement: any;
    map: google.maps.Map;
  constructor() { }
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center:this.coordinates,
    zoom:10
  }
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });
  ngOnInit(): void {
    this.mapInitializer()
 }
 mapInitializer() {
  this.map = new google.maps.Map(this.mapElement.nativeElement, 
  this.mapOptions);
  this.marker.setMap(this.map);
}
 
 searchDrivers(){
 }
  
}
