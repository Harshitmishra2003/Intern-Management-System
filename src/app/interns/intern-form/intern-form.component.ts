import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InternService } from '../../intern.service';
import { BatchService } from '../../batch.service';
import { Batch } from '../../batches/batch.model';

@Component({
  selector: 'app-intern-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './intern-form.component.html'
})
export class InternFormComponent implements OnInit {

  internForm!: FormGroup;

  batches: Batch[] = [];
  runningBatches: Batch[] = [];

  generatedInternId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private internService: InternService,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {

    this.internForm = this.fb.group({
    name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required], // ✅ FIXED
    idCardType: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    batchId: ['', Validators.required]
   });

    // ✅ FIX — Load batches from backend API
    this.batchService.getBatches().subscribe({
      next: (batches: Batch[]) => {
        this.batches = batches;
        this.filterRunningBatches();
      },
      error: err => console.error(err)
    });

    this.internForm.get('idCardType')?.valueChanges.subscribe(() => {
      this.generateInternIdPreview();
    });

    this.internForm.get('dateOfJoining')?.valueChanges.subscribe(() => {
      this.generateInternIdPreview();
    });
  }

  private filterRunningBatches(): void {

    const today = new Date();
    today.setHours(0,0,0,0);

    this.runningBatches = this.batches.filter(batch => {

      const start = new Date(batch.startDate);
      const end = new Date(batch.endDate);

      start.setHours(0,0,0,0);
      end.setHours(23,59,59,999);

      return today >= start && today <= end;
    });
  }

  private generateInternIdPreview(): void {

    const idCardType = this.internForm.get('idCardType')?.value;
    const dateOfJoining = this.internForm.get('dateOfJoining')?.value;

    if (!idCardType || !dateOfJoining) {
      this.generatedInternId = null;
      return;
    }

    const formattedDate = dateOfJoining.replace(/-/g, '');
    const prefix = idCardType === 'PREMIUM' ? 'EMP' : 'TDA';

    // ✅ FIXED template string
    this.generatedInternId = `${prefix}${formattedDate}-001`;
  }

  submit(): void {

  if (this.internForm.invalid) {
    this.internForm.markAllAsTouched();
    return;
  }

  const formValue = this.internForm.value;

  const payload = {
    name: formValue.name,
    email: formValue.email,
    mobileNumber: formValue.mobileNumber,
    idCardType: formValue.idCardType,
    dateOfJoining: formValue.dateOfJoining,
    batchId: Number(formValue.batchId)   // 🔥 IMPORTANT FIX
  };

  console.log("Sending payload:", payload);

  this.internService.addIntern(payload).subscribe({
    next: (res) => {
      console.log("Success:", res);
      alert("Intern added successfully");
      this.internForm.reset();
      this.generatedInternId = null;
    },
    error: err => {
      console.error("Backend error:", err);
      alert("Error adding intern");
    }
  });
 }
}
