import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  profileObject : Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.profileObject = [];
    this.profileObject.push({'firstName': 'Ed', 'lastName': 'Ogeron', 'email':'ed@gmail.com', 'phone':'555-555-5555'});

  }

}
