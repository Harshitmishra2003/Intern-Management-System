import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchService } from '../app/batch.service';
import { InternService } from '../app/intern.service';

import { Batch } from '../app/batches/batch.model';
import { Intern } from '../app/interns/intern.model';
import { HttpClient } from '@angular/common/http';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html'
})
export class ReportsComponent implements OnInit {

  completedBatches: Batch[] = [];

  constructor(
    private batchService: BatchService,
    private internService: InternService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  this.batchService.getBatches().subscribe({
    next: (batches: Batch[]) => {
      this.completedBatches =
        batches.filter(b => b.status === 'COMPLETED');
    },
    error: (err) => {
      console.error('Failed to load batches', err);
    }
  });
  }

  downloadReport(batch: Batch): void {

  this.http.get(
    `http://localhost:8080/api/reports/batch/${batch.id}`,
    { responseType: 'blob' }
  ).subscribe({
    next: (blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${batch.name}-report.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Report download failed', err);
    }
  });
 }
}
