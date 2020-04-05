import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  apiLoaded: boolean = false;

  constructor(private http: HttpClient, private log: LogService) { }

  getGoogleApi()  {
    if (!this.apiLoaded){
      this.http.get(`${environment.infoUri}maps-api`)
      .subscribe(
          (response) => {
            this.log.info("Received Google Maps API key: "+
              JSON.stringify(response));
            if(response["GOOGLE_MAPS_API_KEY"]){
                new Promise((resolve) => {
                  let script: HTMLScriptElement = document.createElement('script');
                  script.addEventListener('load', r => resolve());
                  script.src = `http://maps.googleapis.com/maps/api/js?key=${response["GOOGLE_MAPS_API_KEY"]}&libraries=places`;
                  document.head.appendChild(script);  
                  this.apiLoaded = true;    
                });
              }    
          }
      );
    }
  }
    
}
