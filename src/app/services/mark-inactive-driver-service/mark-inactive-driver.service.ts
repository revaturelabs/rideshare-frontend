import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkInactiveDriverService {

  // URL
  private url = "http://localhost:8080/users/"
  private urlCar = "http://localhost:8080/cars/users/"





  constructor(private httpClient: HttpClient) { }


getDriverById(id: number): Observable <any>{
  console.log ("driver url", this.url + id);
  return this.httpClient.get(this.url + id);
  
  }


changeDriverIsAccepting(data) {
  console.log("put method", data);
  let id=data.userId;
  return this.httpClient.put(this.url+id, data)
  
}

getRidersForLocation(location: string): Observable <any> {
  console.log("getRidersForLocation url ", this.url + '?is-driver=false&location='+ location);
  return this.httpClient.get(this.url + '?is-driver=false&location='+ location)
}

getCarByUserId(id:number): Observable <any> {
  console.log("getCarByUserId url ", this.urlCar + id);
  return this.httpClient.get(this.urlCar + id);
  

}

  showAllUser(): Observable<any>{
    return this.httpClient.get(this.url);
  }

}