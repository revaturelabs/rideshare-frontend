import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
      this.getGoogleApiKey();
  }

  //get googleapikey to hold in user service component to use throughout application
  getGoogleApiKey()  {
    this.http.get(`${environment.loginUri}getGoogleApi`)
       .subscribe(
                 (response) => {
                     if(response["googleMapAPIKey"] != undefined){
                         new Promise(() => {
                         this.userService.googleApiKey = response['googleMapAPIKey'][0];
                     }); 
               }
           }
       );
   }



}
