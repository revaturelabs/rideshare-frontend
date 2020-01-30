import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  page = 1;
  pageSize =10;
  items = [];
  constructor() {
   for(let i = 1; i <= 100; i++){
      this.items.push({Name: 'Name ' + i}, {Distance: 'Distance ' + i}, {Time: 'Time ' + i});
   }
  }

  ngOnInit() {
  }

}
