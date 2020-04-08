import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  formattedAddress = '';
  options = {
    componentRestrictions : {
      country: ['US']
    }
  }
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formattedAddress;
  }

}
