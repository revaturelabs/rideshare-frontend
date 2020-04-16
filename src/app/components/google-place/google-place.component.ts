import { Component, ViewChild, AfterViewInit, Output,EventEmitter } from '@angular/core';

declare var google;



@Component({
    selector: 'app-google-place',
    template: `<input #addresstext class="form-control" type="text" style="width:230px;border-radius:15px;">`
})
export class GooglePlaceComponent implements AfterViewInit {
  @ViewChild('addresstext', {static: false}) addresstext: any;

  addressEntities: Array<any>;
  
  @Output() googlePlaceObj = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: {country: 'US'},
        types: ['geocode']
      });
    //Google places docs: "MVC state change notifications reflect changes in Maps JavaScript API objects and are named using a property_changed convention."
    //Pass the configured autocomplete class object into event's addListener method.
    //'place_changed' is a custom google event.
    //The function called will get the 'place' object of type <any> and captures from it the 'address_components' array into our 'addressEntities' <any> array.
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.googlePlaceObj.emit(place);
      console.log("This place object of type <any>: ");
      console.log(place);
      console.log(place.formatted_address);
      this.addressEntities = place.address_components;
      console.log();
      console.log("****** length of address array is: " + this.addressEntities.length + " ******");
      if (this.addressEntities.length==8 ) 
      {
      console.log("STREET NUMBER: " + this.addressEntities[0].long_name);
      console.log("STREET NAME: " + this.addressEntities[1].long_name);
      console.log("CITY: " + this.addressEntities[2].long_name);
      console.log("DISTRICT: " + this.addressEntities[3].long_name);
      console.log("COUNTY: " + this.addressEntities[4].long_name);
      console.log("STATE: " + this.addressEntities[5].long_name);
      console.log("COUNTRY: " + this.addressEntities[6].long_name);
      console.log("POSTAL/ZIP CODE: " + this.addressEntities[7].long_name);
      console.log("DELIVERY ROUTE: " + this.addressEntities[7].long_name);
     }
   else{
    console.log("STREET NUMBER: " + this.addressEntities[0].long_name);
    console.log("STREET NAME: " + this.addressEntities[1].long_name);
    console.log("CITY: " + this.addressEntities[2].long_name);
    console.log("DISTRICT: " + this.addressEntities[3].long_name);
    console.log("COUNTY: " + this.addressEntities[4].long_name);
    console.log("STATE: " + this.addressEntities[5].long_name);
    console.log("COUNTRY: " + this.addressEntities[6].long_name);
 
   }


    });

  }

}