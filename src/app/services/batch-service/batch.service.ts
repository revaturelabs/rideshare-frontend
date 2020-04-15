import { Injectable } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';



/**
 * This is the batch service
 */



@Injectable({
    providedIn: 'root'
})

export class BatchService {

	url: string = environment.batchesUri;
	batches: Batch[];
	
	constructor(private http: HttpClient) { }


	
	/**
	 * This function fetches all the batches.
	 */
	getAllBatches() {
		return this.http.get<Batch[]>(this.url);
	}

	getAllBatchesByLocation(location: string): Observable<Batch[]> {
		return this.http.get<Batch[]>(`${this.url}?location=${location}`);
	}

	getAllBatchesByLocation1(): Observable<Batch[]> {
		return this.http.get<Batch[]>(`${this.url}`);
	}
	getBatchById(batchId): Observable<Batch> {
	return this.http.get<Batch>(`${this.url}+${batchId}`);
	}
}
