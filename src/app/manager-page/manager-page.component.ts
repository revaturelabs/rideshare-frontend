import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  showManagerPage:boolean;
  showEditOffice:boolean;
  showManagerEditEmployee:boolean;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Manager Page - RideShare");
    this.showManagerPage = true;
    this.showEditOffice = false;
    this.showManagerEditEmployee = false;
  }

  editEmployee(){


    this.showManagerPage = false;
    this.showManagerEditEmployee = true;
  }

  editLocation(){


    this.showManagerPage = false;
    this.showEditOffice = true;
  }

}