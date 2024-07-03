import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-patient-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-patient-delete-modal.component.html',
  styleUrl: './confirm-patient-delete-modal.component.scss'
})
export class ConfirmPatientDeleteModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
  }

  cancel() {
    this.cancelled.emit();
  }
}
