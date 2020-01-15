import { Injectable } from '@angular/core';
import { Batch } from 'src/app/models/batch';

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
  
	batches: Batch[] = [
		{batchNumber: 1, batchLocation: 'VWU - Morgantown, WV'},
		{batchNumber: 2, batchLocation: 'UTA - Arlington, TX'},
		{batchNumber: 3, batchLocation: 'USF - Tampa, FL'},
		{batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA'},
		{batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY'},
		{batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY'}
	];

	/**
	 * This function fetches all the batches.
	 */
	getAllBatches() {
		return this.batches;
	}
}
