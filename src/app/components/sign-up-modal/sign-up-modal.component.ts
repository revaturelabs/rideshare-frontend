import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { } from 'googlemaps';
import { GoogleService } from 'src/app/services/google-service/google.service';
import { Promise } from 'q';

@Component({
  selector: "signupmodal",
  templateUrl: "./sign-up-modal.component.html",
  styleUrls: ["./sign-up-modal.component.css"]
})
export class SignupModalComponent implements OnInit {
  fname: string;
  lname: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  isDriver: boolean;
  isRider: boolean;
  newUserName: boolean;

  user: User = new User();
  batch: Batch = new Batch();
  batches: Batch[];
  users: User[];
  // validation
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneNumberError: string;
  userNameError: string;
  hAddressError: string;
  hStateError: string;
  hCityError: string;
  hZipError: string;

  success: string;
  failed: string;
  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef: BsModalRef;
  states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
  ];
  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private batchService: BatchService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
    this.failed = "";
    this.batchService.getAllBatchesByLocation1().subscribe(res => {
      this.batches = res;
    });
  }
  //Opens 'sign up' modal that takes in a template of type 'ng-template'.

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.initAutocomplete();

  }

  sleep(ms) {
    return Promise(resolve => setTimeout(resolve, ms));
  }

  fixPlacesApi() {
    (<HTMLElement>document.getElementsByClassName('pac-container')[0]).style.zIndex = '1051';
  }

  initAutocomplete(): void {

    var self = this;
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.

    var autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('autocomplete'), { types: ['geocode'] });

    //making the pac-container zIndex higher than the modal so it shows up.
    this.sleep(1000).then(res => this.fixPlacesApi());

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
        (<HTMLInputElement>document.getElementById(component)).value = '';
      }

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          console.log(val);
          (<HTMLInputElement>document.getElementById(addressType)).value = val;
          switch (addressType) {
            case "locality":
              self.user.hCity = val;
              break;
            case "administrative_area_level_1":
              self.user.hState = val;
              break;
            case "postal_code":
              self.user.hZip = val;
              break;
          }
        }
      }
      console.log(self.user.hState);
      // Create a proper address by combining street_number and route
      self.address = place.address_components[0]['long_name'] + ' ' +
        place.address_components[1]['long_name'];
      (<HTMLInputElement>document.getElementById('address')).value =
        place.address_components[0]['long_name'] + ' ' +
        place.address_components[1]['long_name'];
      self.user.hAddress = place.address_components[0]['long_name'] + ' ' +
        place.address_components[1]['long_name'];
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(): void {
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


  submitUser() {
    this.newUserName = true;
    this.user.userId = 0;
    this.firstNameError = "";
    this.lastNameError = "";
    this.phoneNumberError = "";
    this.userNameError = "";
    this.emailError = "";
    this.hStateError = "";
    this.hAddressError = "";
    this.hCityError = "";
    this.hZipError = "";
    this.success = "";
    this.failed = "Registration Unsuccessful!";

    //Format phone
    let phone = this.user.phoneNumber.replace(/[^\w\s]/gi, "");
    if (phone.length == 10) {
      phone =
        phone.substring(0, 3) +
        "-" +
        phone.substring(3, 6) +
        "-" +
        phone.substring(6, 10);
      console.log(phone);
      this.user.phoneNumber = phone;
    } else {
      this.user.phoneNumber = phone;
    }

    console.log(this.user.userName);
    //Check username
    if (this.user.userName == "") {
      console.log("empty username");
    } else {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].userName.includes(this.user.userName)) {
          console.log("this username is taken :" + this.users[i].userId);
          this.newUserName = false;
          console.log(this.newUserName);
          break;
        }
      }
    }
    this.user.wAddress = this.user.hAddress;
    this.user.wState = this.user.hState;
    this.user.wCity = this.user.hCity;
    this.user.wZip = this.user.hZip;
    let driver = <HTMLInputElement>document.getElementById("driver");
    let rider = <HTMLInputElement>document.getElementById("rider");

    if (driver.checked == true) {
      this.user.isDriver = true;
    }
    if (rider.checked == true) {
      this.user.isDriver = false;
    }
    //console.log(this.user);
    if (this.newUserName == false) {
      this.userNameError = "Username already in use";
    }
    this.userService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        let i = 0;
        if (res.firstName != undefined) {
          this.firstNameError = res.firstName[0];
          i = 1;
        }
        if (res.lastName != undefined) {
          this.lastNameError = res.lastName[0];
          i = 1;
        }
        if (res.phoneNumber != undefined) {
          this.phoneNumberError = res.phoneNumber[0];
          i = 1;
        }
        if (res.email != undefined) {
          this.emailError = res.email[0];
          i = 1;
        }
        if (res.userName != undefined) {
          this.userNameError = res.userName[0];
          i = 1;
        }
        if (res.hState != undefined) {
          this.hStateError = res.hState[0];
          i = 1;
        }
        if (res.hAddress != undefined) {
          this.hAddressError = res.hAddress[0];
          i = 1;
        }
        if (res.hCity != undefined) {
          this.hCityError = res.hCity[0];
          i = 1;
        }
        if (res.hZip != undefined) {
          this.hZipError = res.hZip[0];
          i = 1;
        }
        if (i === 0) {
          i = 0;
          this.success = "Registered successfully!";
          this.failed = "";
          //Reload user list
          this.userService.getAllUsers().subscribe(res => {
            this.users = res;
          });
        }
      }
      /*res => {
        console.log("failed to add user");
        console.log(res);
      }*/
    );
  }
}
