import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batch } from 'src/app/models/batch';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchService {

	url: string = environment.batchesUri; 

	constructor(private http: HttpClient) { }

	getAllBatches() {
		return this.http.get<Batch[]>(this.url);
	}
}
