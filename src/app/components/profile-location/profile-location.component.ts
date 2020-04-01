import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { } from 'googlemaps';
import { GoogleService } from 'src/app/services/google-service/google.service';
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
  failed: string;
  emptyAddress: string;
  emptyCity: string;
  emptyZip: string;

  constructor(private userService: UserService,
    private http: HttpClient,
    private googleService: GoogleService) { }

  ngOnInit() {
    // this.googleService.getGoogleApi();
    this.initAutocomplete();
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;
      this.zipcode = response.hZip;
      this.city = response.hCity;
      this.address = response.hAddress;
      this.address2 = response.wAddress;
      this.hState = response.hState;
    });
  }

  initAutocomplete(): void {
    var self = this;
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement> document.getElementById('autocomplete'), {types: ['geocode']});

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    function fillInAddress(): void {
      // Get the place details from the autocomplete object.
      var place = autocomplete.getPlace();

      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        postal_code: 'short_name'
      };
    
      for (var component in componentForm) {
        (<HTMLInputElement> document.getElementById(component)).value = '';
      }
    
      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          (<HTMLInputElement> document.getElementById(addressType)).value = val;
          switch (addressType) {
            case "locality":
              self.city = val;
              break;
            case "administrative_area_level_1":
              self.hState = val;
              break;
            case "postal_code":
              self.zipcode = val;
              break;
          }
        }
      }
      // Create a proper address by combining street_number and route
      self.address = place.address_components[0]['long_name'] + ' ' +
      place.address_components[1]['long_name'];
      (<HTMLInputElement> document.getElementById('address')).value = 
        place.address_components[0]['long_name'] + ' ' +
        place.address_components[1]['long_name'];
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle(
            {center: geolocation, radius: position.coords.accuracy});
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    //console.log(this.currentUser);
    switch(this.currentUser.hCity){
      case '': this.emptyCity = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
              this.success = "";
              break;
      default: this.emptyCity = "";
    }
    switch(this.currentUser.hAddress){
      case '': this.emptyAddress = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
              this.success = "";
              break;
      default: this.emptyAddress = "";
    }
    switch(String(this.currentUser.hZip)){
      case '': this.emptyZip = "Invalid Input! Cannot be empty";
              this.failed = "CANNOT UPDATE CONTACT INFORMATION!"
              this.success = "";
              break;
      default: this.emptyZip = "";
    }
    if ((this.currentUser.hAddress !== '') && (this.currentUser.hCity !== '') && (String(this.currentUser.hZip) !== '')) {
      this.userService.updateUserInfo(this.currentUser);
      this.success = "Updated Successfully!";
      this.failed = "";
    }

  }

}
