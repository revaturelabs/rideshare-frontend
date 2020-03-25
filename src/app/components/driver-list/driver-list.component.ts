import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';

interface IGoogleMapsAPIResponse {
  googleMapAPIKey: string;
}

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location = 'Morgantown, WV';
  location_s = '';
  mapProperties: {};
  // associates columns of table
  tableColumns: string[] = ['Name', 'Distance', 'Time'];
  availableCars: Array<any> = [];
  drivers: Array<any> = [];

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService) { }
  // load google map api
  ngOnInit() {
    this.drivers = [];
    this.getGoogleApi();

    this.userService.getRidersForLocation2(this.location).subscribe(
      res => {
        res.forEach(element => {
          console.log(element.user);
          this.drivers.push({
            id: element.user.userId,
            name: element.user.firstName + ' ' + element.user.lastName,
            origin: element.user.hCity + ',' + element.user.hState,
            email: element.user.email,
            phone: element.user.phoneNumber,
            seats: element.seats
          });
        });
      });

    // Why are we sleeping instead using callbacks/observables?
    this.sleep(2000).then(() => {
      this.mapProperties = {
        center: new google.maps.LatLng(Number(sessionStorage.getItem('lat')), Number(sessionStorage.getItem('lng'))),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      // get all routes
      this.displayDriversList(this.location, this.drivers);
      // show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
​
    });
  }
​
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getGoogleApi() {
    this.http.get<IGoogleMapsAPIResponse>(`${environment.loginUri}getGoogleApi`)
      .subscribe(
        (response) => {
          if (response.googleMapAPIKey !== undefined) {
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

  searchDriver() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
    this.userService.getRidersForLocation1(this.location_s)
      .subscribe(
        (response) => {
          response.forEach(element => {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              draggable: true,
              map: this.map
            });
            this.displayRoute(this.location_s, element.hCity + ',' + element.hState, directionsService, directionsRenderer);
          });
        });
  }

  showDriversOnMap(origin, drivers) {
    drivers.forEach(element => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map
      });
      this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
  }


  displayRoute(origin, destination, service, display) {
    service.route({
      origin,
      destination,
      travelMode: 'DRIVING',
    }, (response, status) => {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  // TODO: Refactor. It is not appropriate to conduct direct DOM manipulation in this way with Angular.
  displayDriversList(origin, drivers) {
    const origins = [];
    origins.push(origin);

    const outputDiv = document.getElementById('output');
    drivers.forEach(element => {
​
      // const service = new google.maps.DistanceMatrixService;

      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins,
        destinations: [element.origin],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
         if (status !== 'OK') {
          alert('Error was: ' + status);
         } else {
           const originList = response.originAddresses;
           const destinationList = response.destinationAddresses;
           const results = response.rows[0].elements;
           const name = element.name;
           const seats = element.seats;

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
                                </td>
                                <td class="col">${seats}</td>
                                </tr>`;


          }
        });
      }

    });
  });

    // right is larger numbers or equal
    // left is strictly less than pivot
​
    const leftSorted = quickSort(left, desc, holder);
    const rightSorted = this.quickSort(right, desc, holder);
​
    // console.log("left: " + leftSorted);
    // console.log("right: " + rightSorted);
​
    // console.log("... : " + [...rightSorted]);
​
    // console.log(pivot);
    console.log([...leftSorted, pivot, ...rightSorted]);
​
    return [...leftSorted, pivot, ...rightSorted];
  }
​
}
}

