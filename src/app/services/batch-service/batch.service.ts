import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batch } from 'src/app/models/batch';

@Injectable({
    providedIn: 'root'
})
export class BatchService {

	url: string = 'http://localhost:8080/batches'; 

	constructor(private http: HttpClient) { }

	getAllBatches() {
		return this.http.get<Batch[]>(this.url);
	}
}
