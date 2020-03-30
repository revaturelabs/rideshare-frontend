import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;
  failure :string;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {

    this.getGoogleApiKey();
    // console.log('google api key is' + this.userService.googleApiKey);
   
   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;
      this.zipcode = response.hZip;
      this.city = response.hCity;
      this.address = response.hAddress;
      this.address2 = response.wAddress;
      this.hState = response.hState;

    });
  }

  getGoogleApiKey()  {
    this.http.get(`${environment.loginUri}getGoogleApi`)
       .subscribe(
                 (response) => {
                     //console.log(response);
                     if(response["googleMapAPIKey"] != undefined){
                         new Promise(() => {
                         this.userService.googleApiKey = response['googleMapAPIKey'][0];
                         console.log(`google api key obtained is: ${this.userService.googleApiKey}`);
                     }); 
               }
           }
       );
   }

  async updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    //console.log(this.currentUser);
    let didSucceed = true;
    const result = await this.userService.updateUserInfo(this.currentUser).then(function(response){
        didSucceed = true;
    }).catch(function(e){

      //address invalidated/googleapi error
        didSucceed = false;

    });
    if (!didSucceed){
        this.failure = 'Invalid address submitted';
        this.success = '';
    }else{
        this.success = 'Successfully updated';
        this.failure = '';
    }


  }
}
