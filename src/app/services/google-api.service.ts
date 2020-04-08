import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private http:HttpClient) { }

getGoogleApi()  {
  this.http.get(`${environment.loginUri}getGoogleApi`)
     .subscribe(
               (response) => {
                   //console.log(response);
                   if(response["googleMapAPIKey"] != undefined){
                    
                       new Promise((resolve) => {
                         let script: HTMLScriptElement = document.createElement('script');
                         script.addEventListener('load', r => resolve());
                         script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}&libraries=places&language=en`;
                         document.head.appendChild(script);
                         console.log("Head Appended");
                         console.log(script)      
                   }); 
             }    
         }
     );
 }
}