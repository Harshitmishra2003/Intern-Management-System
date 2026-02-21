import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { BatchService } from '../../batch.service';
import { BatchRequest } from '../../batches/batch-request.model';

@Component({
  selector: 'app-batch-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './batch-form.component.html'
})
export class BatchFormComponent {

  batchForm: FormGroup;
  isSubmitting = false;
  maxEndDate: string = '';

  constructor(
    private fb: FormBuilder,
    private batchService: BatchService,
    private router: Router
  ) {

    this.batchForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {
      validators: this.dateRangeValidator
    });

    // When start date changes
    this.batchForm.get('startDate')?.valueChanges.subscribe(start => {
      if (start) {
        const startDate = new Date(start);

        const maxDate = new Date(startDate);
        maxDate.setMonth(maxDate.getMonth() + 6);

        this.maxEndDate = maxDate.toISOString().split('T')[0];

        // reset end date when start changes
        this.batchForm.get('endDate')?.reset();
      } else {
        this.maxEndDate = '';
      }
    });
  }

  // Custom validator: endDate must be within 6 months
  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (!start || !end) return null;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const maxDate = new Date(startDate);
    maxDate.setMonth(maxDate.getMonth() + 6);

    if (endDate < startDate || endDate > maxDate) {
      return { invalidDateRange: true };
    }

    return null;
  }

  submit(): void {

    if (this.batchForm.invalid) {
      this.batchForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const batchRequest: BatchRequest = {
      name: this.batchForm.value.name,
      startDate: this.batchForm.value.startDate,
      endDate: this.batchForm.value.endDate
    };

    this.batchService.addBatch(batchRequest)
      .subscribe({
        next: () => {
          alert('Batch created successfully!');
          this.batchForm.reset();
          this.isSubmitting = false;
          this.router.navigate(['/batches']);
        },
        error: (err) => {
          console.error('Batch creation failed:', err);
          alert('Failed to create batch.');
          this.isSubmitting = false;
        }
      });
  }
}