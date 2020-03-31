import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { GoogleService } from "../google-service/google.service";
import { LogService } from "../log.service";
//import { Autocomplete } from 'googlemaps';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient, private log: LogService, private googleService: GoogleService) { }

  placeSearch: any;
  autocomplete: google.maps.places.Autocomplete;

  count:number = 0;
  address: Address;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
  };

  initAutocomplete(autocompleteElement: HTMLInputElement) {
    console.log('started initAutocomplete');
    var self = this;

    this.address = new Address;

    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      autocompleteElement, { types: ['geocode'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener('place_changed', fillInAddress);

    function fillInAddress() {
      // Get the place details from the autocomplete object.
      var place = self.autocomplete.getPlace();

      for (var component in self.componentForm) {
        (<HTMLInputElement>document.getElementById(component)).value = '';
      }

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (self.componentForm[addressType]) {
          var val = place.address_components[i][self.componentForm[addressType]];
          (<HTMLInputElement>document.getElementById(addressType)).value = val;
          switch (addressType) {
            case "locality":
              self.address.city = val;
              break;
            case "administrative_area_level_1":
              self.address.hState = val;
              break;
            case "postal_code":
              self.address.zipcode = val;
              break;
          }
        }
      }
      // Create a proper address by combining street_number and route
      self.address.address = place.address_components[0]['long_name'] + ' ' + place.address_components[1]['long_name'];
      (<HTMLInputElement>document.getElementById('address')).value = place.address_components[0]['long_name'] + ' ' +
        place.address_components[1]['long_name'];
    }

    console.log('finished initAutocomplete');
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

  updatesContactInfo(currentUser: User): User {
    currentUser.hZip = this.address.zipcode;
    currentUser.hCity = this.address.city;
    currentUser.hAddress = this.address.address;
    currentUser.wAddress = "Not Used";
    currentUser.hState = this.address.hState;

    return currentUser;
  }

  getCount():number{
    return this.count;
  }

  counter():number{
    this.count++;
    return this.count;
  }

}
