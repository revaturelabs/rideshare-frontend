import { Component, OnInit } from '@angular/core';
import { Office } from '../../models/office';
import { OfficeServiceService } from '../../services/office-service.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  offices: Office[];

  constructor(private os : OfficeServiceService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Home - RideShare");
  }

  async register(){
    this.offices =  await this.os.getAllOffices();
    sessionStorage.setItem("offices", JSON.stringify(this.offices));
    console.log(this.offices);
  }


}
