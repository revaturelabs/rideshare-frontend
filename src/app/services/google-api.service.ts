import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private http:HttpClient) { }

  getGoogleApi() {
    this.http.get(`${environment.loginUri}getGoogleApi`)
      .subscribe((response) => {
        //console.log(response);
        if(response["googleMapAPIKey"] != undefined) {
            new Promise((resolve) => {
              let script: HTMLScriptElement = document.createElement('script');
              script.addEventListener('load', r => resolve());
              script.src = `https://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}&libraries=places&language=en`;
              document.head.appendChild(script);
           
          });
        }
      });
  }
}