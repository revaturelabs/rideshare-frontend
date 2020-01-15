import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batch } from 'src/app/models/batch';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
/**
 * This is the batch service
 */
export class BatchService {

	/**
	 * Sets the url to the env var
	 */

	url: string = environment.batchesUri; 

	/**
	 * This is a constructor that creates HTTP client service
	 * @param http A HTTP Client 
	 */

	constructor(private http: HttpClient) { }

	/**
	 * This function fetches all the batches.
	 */
	getAllBatches() {
		return this.http.get<Batch[]>(this.url);
	}
}
