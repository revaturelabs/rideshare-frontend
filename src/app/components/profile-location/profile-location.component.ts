import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { LocationService } from 'src/app/services/location-service/location.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { } from 'googlemaps';
import { Address } from 'src/app/models/address';
declare var google: any;

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  currentUser: User;
  success :string;
  autocomplete: google.maps.places.Autocomplete;
  placeSearch: any;

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
    private http: HttpClient, private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.initAutocomplete(<HTMLInputElement>document.getElementById('autocomplete'));
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
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
    this.currentUser = this.locationService.updatesContactInfo(this.currentUser);
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }
}
