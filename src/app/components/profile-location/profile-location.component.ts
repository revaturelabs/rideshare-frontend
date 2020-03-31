import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { LocationService } from 'src/app/services/location-service/location.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { } from 'googlemaps';
declare var google: any;

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  zipcode: number;
  city:string;
  address:string;
  street_number: string;
  route: string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;
  autocomplete: google.maps.places.Autocomplete;

  constructor(private userService: UserService,
    private http: HttpClient, private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.initAutocomplete();
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;
      this.zipcode = response.hZip;
      this.city = response.hCity;
      this.address = response.hAddress;
      this.address2 = response.wAddress;
      this.hState = response.hState;
    });
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(): void {
    this.locationService.geolocate();
  }

  updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }
}
