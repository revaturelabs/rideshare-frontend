import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  zipcode: number;
  city: string;
  address: string;
  address2: string;
  hState: string;
  currentUser: User;
  success: string;
  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;

  constructor(private userService: UserService, private http: HttpClient) {
   }

  ngOnInit() {
    this.getGoogleApi();
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response) => {
      this.currentUser = response;
    });
  }

  updatesContactInfo() {
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }

  getGoogleApi() {
    this.http.get(`${environment.loginUri}getGoogleApi`)
      .subscribe(
      (response) => {
        //console.log(response);
        if (response["googleMapAPIKey"] != undefined) {
          new Promise((resolve) => {
            let script: HTMLScriptElement = document.createElement('script');
            script.addEventListener('load', r => resolve());
            script.src = `https://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}&libraries=places`;
            document.head.appendChild(script);
          });
    
        }
    
      }
      );
  }



  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.

    let autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('autocomplete'), { types: ['geocode'] });
    this.autocomplete = autocomplete;
    console.log(this.autocomplete);
    // let autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('autocomplete'), { types: ['geocode'] });
    // this.autocomplete = autocomplete;
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

 fillInAddress() {
  // Get the place details from the autocomplete object.
  let place = this.autocomplete.getPlace();
  console.log(place);
  

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
        { center: geolocation, radius: position.coords.accuracy });
      this.autocomplete.setBounds(circle.getBounds());
    });
  }
}
}
