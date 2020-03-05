import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { User } from 'src/app/models/user';
// import { UserService } from 'src/app/services/user-service/user.service';
// import { AuthService } from 'src/app/services/auth-service/auth.service';
// import { Batch } from 'src/app/models/batch';
// import { Car } from 'src/app/models/car';
// import { CarService } from 'src/app/services/car-service/car.service';
// import { Router } from '@angular/router';
// import { BatchService } from 'src/app/services/batch-service/batch.service';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { ɵAnimationGroupPlayer } from '@angular/animations';
import { CarServiceService } from '../../services/car-service.service';
import { EmployeeServiceService } from '../../services/employee-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];


  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient,private employeeService:EmployeeServiceService, private carService: CarServiceService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Driver List - RideShare");
    this.drivers = [];
    
    this.employeeService.getDriversForLocation(this.location).subscribe(
      res => {
           //console.log(res);
           res.forEach(async element => {
         //   let car = await this.carService.getCarByUserId(element.userId);
            //  let car = this.getCarForUser(element.userId);
              this.drivers.push({
                   'id': element.employee_id,
                 'name': element.first_name+" "+element.last_name,
                'driverlocation':element.user_address, 
                'email': element.email, 
                'phone':element.phone_number,
                //'seats':car.seats
              });
          });
      });
    /*this.drivers.push({'id': '1','name': 'Ed Ogeron','origin':'Reston, VA', 'email': 'ed@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'id': '2','name': 'Nick Saban','origin':'Oklahoma, OK', 'email': 'nick@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'id': '3','name': 'Bobbie sfsBowden','origin':'Texas, TX', 'email': 'bobbie@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'id': '4','name': 'Les Miles','origin':'New York, NY', 'email': 'les@gmail.com', 'phone':'555-555-5555'});
    this.drivers.push({'id': '5','name': 'Bear Bryant','origin':'Arkansas, AR', 'email': 'bear@gmail.com', 'phone':'555-555-5555'});*/
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
      this.displayDriversList(this.location, this.drivers);
      //show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
    });
  }




  // car:Car;
  //  async getCarForUser(id:number){
  //      let response = await this.carService.getCarByUserId(id);
  //      this.car = response;
  // }
  
  

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async getGoogleApi()  {
     this.http.get(`http://localhost:9999/configurations/API_KEY`)
        .subscribe(
                  (response) => {
                  
                      console.log("jrknjtkenkjh");
                      if(response != undefined){
                        console.log(response);
                         new Promise((resolve) => {
                           let script: HTMLScriptElement = document.createElement('script');
                           script.addEventListener('load', r => resolve());
                           script.src = `http://maps.googleapis.com/maps/api/js?key=${response}`;
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
       this.displayRoute(origin, element.driverlocation, directionsService, directionsRenderer);
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
        destinations: [element.driverlocation],
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
          if(results[0].distance.value < 26400){
            element.distance = results[0].distance.text;
            element.time = results[0].duration.text;
            return element;
            }
      }
    });
    
   });
}

}
