import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkInactiveDriverService {

  url: string = 'http://localhost-8080/users'

  constructor(private httpClient: HttpClient) { }
}
