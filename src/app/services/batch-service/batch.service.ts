import { Injectable } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BatchService {

	constructor(private http: HttpClient) { }

	getAllBatchesByLocation(location) {
		return this.http.get<Batch>(`http://localhost:8080/batches?location=${location}`)
	}
}
