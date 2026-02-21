import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Batch } from './batches/batch.model';
import { BatchRequest } from './batches/batch-request.model';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  private apiUrl = `${environment.apiBaseUrl}/batches`;

  constructor(private http: HttpClient) {}

  getBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.apiUrl);
  }

  addBatch(batch: BatchRequest): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl, batch);
  }

  deleteBatch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBatchById(id: number): Observable<Batch> {
    return this.http.get<Batch>(`${this.apiUrl}/${id}`);
  }

  updateBatch(id: number, batch: BatchRequest): Observable<Batch> {
    return this.http.put<Batch>(`${this.apiUrl}/${id}`, batch);
  }
}