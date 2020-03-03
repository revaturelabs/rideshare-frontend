import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  constructor(private http:HttpClient) { }


  getConfigurationByLabel(label:string):Promise<string>{

    return this.http.get(`http://localhost:9999/configurations/${label}`,{responseType: 'text'}).toPromise();
  }

  // got this id and key by creating ekata.com account
id:string="bce97184e1484ef69ae1efbc9f379da3";
// id:string = "3cdb700e-58fb-2ba1-229c-b23c5aa061f0";
// key:string = "4NOpcRXvbVlGPohGgG2M";
country:string = "US";
verifyAddress(state:string ,city:string,address1:string, zipcode:number):Promise<any>{
  return this.http.get<any>(`https://api.ekata.com/3.1/location_intel?api_key=${this.id}&street_line_1=${address1}&city=${city}&state_code=${state}&postal_code=${zipcode}&country_code=${this.country}`).toPromise();
}
}
