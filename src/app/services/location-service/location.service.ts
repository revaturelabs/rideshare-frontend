import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from "../log.service";
import { Autocomplete } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient, private log: LogService) { }

  placeSearch: any;
  autocomplete: any;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  
  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>document.getElementById('autocomplete'), {types: ['geocode']});
  
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component']);
  
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = this.autocomplete.getPlace();
  
    for (var component in this.componentForm) {
      (<HTMLInputElement>document.getElementById(component)).value = '';
      (<HTMLInputElement>document.getElementById(component)).disabled = false;
    }
  
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (this.componentForm[addressType]) {
        var val = place.address_components[i][this.componentForm[addressType]];
        (<HTMLInputElement>document.getElementById(addressType)).value = val;
      }
    }
  }
  
  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate() {
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
}
