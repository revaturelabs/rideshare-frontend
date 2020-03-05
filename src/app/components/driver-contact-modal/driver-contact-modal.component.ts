import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-driver-contact-modal',
  templateUrl: './driver-contact-modal.component.html',
  styleUrls: ['./driver-contact-modal.component.css']
})
export class DriverContactModalComponent implements OnInit {

  origin : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];
  @Input() driver:Element;

  @ViewChild('maps',null) mapElement: any;
  map: google.maps.Map;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

}
