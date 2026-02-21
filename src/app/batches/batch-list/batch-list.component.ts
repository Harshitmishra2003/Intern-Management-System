import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BatchService } from '../../batch.service';
import { Batch } from '../batch.model';

@Component({
  selector: 'app-batch-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './batch-list.component.html'
})
export class BatchListComponent {

  batches: Batch[] = [];
  loading = true;
  error = '';

  constructor(private batchService: BatchService, private cd: ChangeDetectorRef) {
    this.loadBatches();
  }

  loadBatches() {
    this.batchService.getBatches().subscribe({
      next: (data) => {
        console.log('DATA:', data);
        this.batches = Array.isArray(data) ? data : [data]; // ✅ handles both array & single object
        this.loading = false;
        this.cd.markForCheck(); // ✅ ensures UI updates if OnPush is used
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load batches';
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  trackById(index: number, batch: Batch): number {
    return batch.id;
  }
  expandedBatchId: number | null = null;

  toggleInterns(batchId: number) {
  this.expandedBatchId = this.expandedBatchId === batchId ? null : batchId;
  }
}