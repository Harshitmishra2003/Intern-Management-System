import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Intern } from './interns/intern.model';
import { InternRequest } from './interns/intern-request.model';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private apiUrl = `${environment.apiBaseUrl}/interns`;

  constructor(private http: HttpClient) {}

  getInterns(): Observable<Intern[]> {
    return this.http.get<Intern[]>(this.apiUrl);
  }

  getInternById(id: number): Observable<Intern> {
    return this.http.get<Intern>(`${this.apiUrl}/${id}`);
  }

  getInternsByBatch(batchId: number): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${this.apiUrl}/batch/${batchId}`);
  }

  addIntern(request: InternRequest): Observable<Intern> {
    return this.http.post<Intern>(this.apiUrl, request);
  }

  updateIntern(id: number, request: InternRequest): Observable<Intern> {
    return this.http.put<Intern>(`${this.apiUrl}/${id}`, request);
  }

  deleteIntern(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}