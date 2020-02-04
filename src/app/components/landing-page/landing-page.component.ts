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

  

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(35.2271, -80.8431),
         zoom: 12,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
 }
 

  

}