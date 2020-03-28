import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-driver-list-entry',
  templateUrl: './driver-list-entry.component.html',
  styleUrls: ['./driver-list-entry.component.css']
})
export class DriverListEntryComponent implements OnInit {
  
  // README: pass in the drivers list from the parent component's html with:
  // where [drivers] matches this component variable and "drivers" matches parent's
  // <app-driver-list-entry [drivers]="drivers"></app-driver-list-entry>

  // data is expected in following format with at least these fields included:
  // this can be deleted once we have the parent feed set up
  driversTest = [{
    name: "Jessie Musashi",
    email: "jessie@teamRocket.com",
    phone: "555-555-0001",
    seatsAvailable: 1,
    distance: "4 miles",
    duration: "15 minutes"
  },{
    name: "James Kojiro",
    email: "james@teamRocket.com",
    phone: "555-555-0002",
    seatsAvailable: 4,
    distance: "1.2 miles",
    duration: "5 minutes"
  },{
    name: "John Smith",
    email: "j.smith@mail.com",
    phone: "555-555-0003",
    seatsAvailable: 3,
    distance: ".5 miles",
    duration: "3 minutes"
  }]

  // I am assuming that the distance and duration will be in this drivers list
  // filtering team said they will try to do just that, if plans do not change
  // maybe car info will also be included, if not we have a cars list below...
  @Input() drivers: Array<any> = [];

  // this cars list is if the component is passed a list of cars corresponding to 
  // the list of drivers. currently the user model has no car entity, but cars
  // have user entities. waiting to see how the data is passed in to this componenet
  //@Input() cars: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
