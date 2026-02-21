import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InternService } from '../../intern.service';
import type { Intern } from '../../interns/intern.model';
import { ChangeDetectorRef } from '@angular/core';

interface Batch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-intern-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './intern-list.component.html'
})
export class InternListComponent implements OnInit {

  dataSource: Intern[] = [];
  filteredInterns: Intern[] = [];

  searchTerm: string = '';
  selectedBatch: number | null = null;
  selectedType: string = '';

  batches: Batch[] = [];

  constructor(
    private internService: InternService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInterns();
  }

  loadInterns(): void {
    this.internService.getInterns().subscribe({
      next: (data: Intern[]) => {

        this.dataSource = data ?? [];
        this.filteredInterns = [...this.dataSource];

        // Extract unique batches
        const unique = new Map<number, string>();
        this.dataSource.forEach(i => {
          if (i.batchId && i.batchName) {
            unique.set(i.batchId, i.batchName);
          }
        });

        this.batches = Array.from(unique.entries())
          .map(([id, name]) => ({ id, name }));
          this.cdr.markForCheck();
      },
      error: err => console.error('Error loading interns:', err)
    });
  }

  applyFilters(): void {

    this.filteredInterns = this.dataSource.filter(i => {

      const matchName =
        this.searchTerm.trim() === '' ||
        i.name?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchBatch =
        this.selectedBatch === null ||
        i.batchId === this.selectedBatch;

      const matchType =
        this.selectedType === '' ||
        i.idCardType === this.selectedType;

      return matchName && matchBatch && matchType;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedBatch = null;
    this.selectedType = '';
    this.filteredInterns = [...this.dataSource];
  }

  editIntern(intern: Intern): void {
    this.router.navigate(['/interns/edit', intern.internId]);
  }

  deleteIntern(intern: Intern): void {
    if (!confirm('Are you sure you want to delete this intern?')) return;

    this.internService.deleteIntern(Number(intern.id))
      .subscribe({
        next: () => this.loadInterns(),
        error: err => console.error(err)
      });
  }
}