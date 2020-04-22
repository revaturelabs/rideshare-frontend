import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service/user.service';
import { environment } from '../../../environments/environment';
import { GoogleApiService } from 'src/app/services/google-api.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  location_s : string =''; //sample: Morgantown, WV
 

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  
  mapProperties :{};

  constructor(private http: HttpClient,private userService: UserService, private googleApi:GoogleApiService) {
    //load google map api
  }

  ngOnInit(): void {
     //load google map  api
    
    // this.getGoogleApi();

    this.sleep(2000).then(() => {
      this.mapProperties = {
         center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
   });

 }

sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 getGoogleApi()  {
  this.googleApi.getGoogleApi();
  // this.http.get(`${environment.loginUri}getGoogleApi`)
  //    .subscribe(
  //              (response) => {
  //                  //console.log(response);
  //                  if(response["googleMapAPIKey"] != undefined){
  //                      new Promise((resolve) => {
  //                        let script: HTMLScriptElement = document.createElement('script');
  //                        script.addEventListener('load', r => resolve());
  //                        script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
  //                        document.head.appendChild(script);      
  //                  }); 
  //            }    
  //        }
  //    );
 }

 searchDriver(){
  //call service search algorithm ()
  //console.log(this.location_s);
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
  this.userService.getRidersForLocation1(this.location_s)
  .subscribe(
            (response) => {
              response.forEach(element => {
                   var directionsService = new google.maps.DirectionsService;
                   var directionsRenderer = new google.maps.DirectionsRenderer({
                         draggable: true,
                         map: this.map
                    });
                    console.log(element.Distance);
                    this.displayRoute(this.location_s, element.hCity+","+element.hState, directionsService, directionsRenderer);
         });
  });
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