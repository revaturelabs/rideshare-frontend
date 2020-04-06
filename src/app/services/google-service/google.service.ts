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

  private keyNotLoaded: boolean = true;

  /**
   * Loads the Google Maps API key from the server, and then adds the
   * functionality as a script to the current web page.
   *
   * @param callback  Optional parameter for anything that needs to be done
   * after the Google Maps API key has been loaded in.
   */
  getGoogleApi(callback?: Function)  {
    if (this.keyNotLoaded) {
      this.http.get(`${environment.infoUri}maps-api`)
       .subscribe(
          (response) => {
            this.log.info("Received Google Maps API key: "+
              JSON.stringify(response));
            if(response["GOOGLE_MAPS_API_KEY"]){
                this.keyNotLoaded = false;
                new Promise((resolve) => {
                  let script: HTMLScriptElement = document.createElement('script');
                  script.addEventListener('load', r => resolve());
                  script.src = `http://maps.googleapis.com/maps/api/js?key=${response["GOOGLE_MAPS_API_KEY"]}&libraries=places`;
                  document.head.appendChild(script);
                  }).then(()=>{
                    if (callback) callback();
                  });
               }
           }
       );
    } else {
      if (callback) callback();
    }

   }
}
