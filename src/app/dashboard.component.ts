import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BatchService } from '../app/batch.service';
import { InternService } from '../app/intern.service';
import { Batch } from '../app/batches/batch.model';
import { Intern } from '../app/interns/intern.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  isSidebarOpen = false;

  batches: Batch[] = [];
  interns: Intern[] = [];

  constructor(
    private router: Router,
    private batchService: BatchService,
    private internService: InternService
  ) {}

  ngOnInit(): void {
    this.loadBatches();
    this.loadInterns();
  }

  loadBatches() {
  this.batchService.getBatches().subscribe({
    next: (data) => {
      console.log("Batches:", data);
      this.batches = data;
    },
    error: (err) => {
      console.error('Error loading batches', err);
    }
  });
 }

 loadInterns() {
  this.internService.getInterns().subscribe({
    next: (data) => {
      console.log("Interns:", data);
      this.interns = data;
    },
    error: (err) => {
      console.error('Error loading interns', err);
    }
  });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  addBatch() {
    this.router.navigate(['/batches/new']);
  }

  addIntern() {
    this.router.navigate(['/interns/new']);
  }

  generateReport() {
    this.router.navigate(['/report']);
  }

  viewInterns() {
    this.router.navigate(['/interns']);
  }

  viewBatch(batch: Batch) {
    this.router.navigate(['/batches', batch.id]);
  }

  batchList() {
    this.router.navigate(['/batches']);
  }
}