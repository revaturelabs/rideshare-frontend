import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { LocationService } from 'src/app/services/location-service/location.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { } from 'googlemaps';
import { GoogleService } from 'src/app/services/google-service/google.service';
import { Address } from 'src/app/models/address';
declare var google: any;

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  currentUser: User;
  success: string;
  autocomplete: google.maps.places.Autocomplete;
  placeSearch: any;
  failed: string;
  emptyAddress: string;
  emptyCity: string;
  emptyZip: string;

  address: Address = new Address;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  constructor(private userService: UserService,
    private http: HttpClient,
    private googleService: GoogleService,
    private locationService: LocationService) { }

  ngOnInit() {
    //call location service to create autocomplete object
    this.locationService.initAutocomplete(<HTMLInputElement>document.getElementById('autocomplete'));
    //get the user by id
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response) => {
      //set the address fields with updated info
      this.currentUser = response;
      this.address.zipcode = response.hZip;
      this.address.city = response.hCity;
      this.address.address = response.hAddress;
      this.address.address2 = response.wAddress;
      this.address.hState = response.hState;
    });
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(): void {
    this.locationService.geolocate();
  }

  updatesContactInfo() {
    //set address fields to info that user typed in
    this.currentUser.hZip = this.address.zipcode;
    this.currentUser.hCity = this.address.city;
    this.currentUser.hAddress = this.address.address;
    this.currentUser.wAddress = this.address.address2;
    this.currentUser.hState = this.address.hState;
    console.log('address ' + this.address.address);
    console.log('city ' + this.address.city);
    console.log('state ' + this.address.hState);
    console.log('zip ' + this.address.zipcode);
    //call location service to update address fields
    this.currentUser = this.locationService.updatesContactInfo(this.currentUser);

    switch (this.currentUser.hCity) {
      case '': this.emptyCity = "Invalid Input! Cannot be empty";
        this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
        this.success = "";
        break;
      default: this.emptyCity = "";
    }
    switch (this.currentUser.hAddress) {
      case '': this.emptyAddress = "Invalid Input! Cannot be empty";
        this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
        this.success = "";
        break;
      default: this.emptyAddress = "";
    }
    switch (String(this.currentUser.hZip)) {
      case '': this.emptyZip = "Invalid Input! Cannot be empty";
        this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
        this.success = "";
        break;
      default: this.emptyZip = "";
    }
    if ((this.currentUser.hAddress !== '') && (this.currentUser.hCity !== '') && (String(this.currentUser.hZip) !== '')) {
      this.currentUser = this.locationService.updatesContactInfo(this.currentUser);
      this.userService.updateUserInfo(this.currentUser).subscribe();
      this.success = "Updated Successfully!";
      this.failed = "";
    }

  }

}
