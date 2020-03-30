import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-driver-list-entry',
  templateUrl: './driver-list-entry.component.html',
  styleUrls: ['./driver-list-entry.component.css']
})
export class DriverListEntryComponent implements OnInit {
  
  // #docregion
  // README: pass in the drivers list from the parent component's html with:
  // where [drivers] matches this component variable and "drivers" matches parent's
  // <app-driver-list-entry *ngFor="let driver of driversList" [driver]=driver></app-driver-list-entry>
  //#endregion
  
  @Input() driver: User;

  constructor() { }

  ngOnInit(): void {
  }

}
