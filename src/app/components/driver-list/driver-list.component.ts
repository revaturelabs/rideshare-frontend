import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { GoogleService } from 'src/app/services/google-service/google.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location: string = 'Morgantown, WV';
  mapProperties: {};
  availableCars: Array<any> = [];
  drivers: Array<any> = [];

  // TODO: Added variables to make getCarByUserId2 work?
  make: string;
  model: string;
  nrSeats: number;
  currentCar: Car;
  success: string;

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private googleService: GoogleService,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.drivers = [];

    // TODO: test out ngOninit to get car info to display on this component
    // this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
    //   this.currentCar = response;
    //   this.make = response.make;
    //   this.model = response.model;
    //   this.nrSeats = response.seats;
    //   console.log("this.nrSeats is " +this.nrSeats);
    // });

    this.userService.getRidersForLocation1(this.location).subscribe(res => {
      // console.log(res);
      res.forEach(element => {
        this.drivers.push({
          id: element.userId,
          name: element.firstName + ' ' + element.lastName,
          origin: element.hCity + ',' + element.hState,
          email: element.email,
          phone: element.phoneNumber
        });
      });
    });

    this.googleService.getGoogleApi();

    this.sleep(2000).then(() => {
      this.mapProperties = {
         center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      // get all routes
      this.displayDriversList(this.location, this.drivers);
      // show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showDriversOnMap(origin, drivers) {
    drivers.forEach(element => {
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map
      });
      this.displayRoute(
        origin,
        element.origin,
        directionsService,
        directionsRenderer
      );
    });
  }

  displayRoute(origin, destination, service, display) {
    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
        // avoidTolls: true
      },
      function(response, status) {
        if (status === 'OK') {
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      }
    );
  }

  //making new method for getting seats from the backend
  displayNumberOfSeats (userId): Car {
    var userCar = new Car();
    this.carService.getCarByUserId2(userId).subscribe(response => {userCar = response});
    console.log(userCar);
    return userCar;
  };

  displayDriversList(origin, drivers) {
    let origins = [];
    // set origin
    origins.push(origin);


    // var seatservice = this.carService
    // this.carService.getCarByUserId(element.getCarByUserId)

    var outputDiv = document.getElementById('output');
    drivers.forEach(element => {
      //   var driver = this.drivers;
      // // TODO: test out displayDriversList to get car info to display on this component
      // this.carService.getCarByUserId2(sessionStorage.getItem("driver")).subscribe((response)=>{
      //   this.currentCar = response;
      //   this.make = response.make;
      //   this.model = response.model;
      //   this.nrSeats = response.seats;
      //   console.log("this.nrSeats is " +this.nrSeats);
      // });

      var service = new google.maps.DistanceMatrixService();
      let carService: CarService;
      service.getDistanceMatrix(
        {
          origins: origins,
          destinations: [element.origin],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        },
        function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var results = response.rows[0].elements;
            // console.log(results[0].distance.text);

            //this is the same method that I abstracted away in the displayNumberOfSeats method from above
            var name = element.name;
            let userCar = new Car();
            console.log(element.id); // <----- that works
            carService.getCarByUserId2(element.id).subscribe(response => {userCar = response});
            console.log(userCar);

            outputDiv.innerHTML += `<tr><td class="col">${name}</td>
                                  <td class="col">${results[0].distance.text}</td>
                                  <td class="col">${results[0].duration.text}</td>

                                  <td class="col">${userCar}</td>

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
        }
      );
    });
  }
}
