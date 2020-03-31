import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient, private log: LogService) { }

  getGoogleApi()  {
    this.http.get(`${environment.infoUri}maps-api`)
       .subscribe(
          (response) => {
            this.log.info("Received Google Maps API key: "+
              JSON.stringify(response));
            if(response["googleMapsApiKey"]){
                new Promise((resolve) => {
                  let script: HTMLScriptElement = document.createElement('script');
                  script.addEventListener('load', r => resolve());
                  script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapsApiKey"]}`;
                  document.head.appendChild(script);      
                  }); 
               }    
           }
       );
   }
}
