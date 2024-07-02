import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-doctor-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete-doctor-modal.component.html',
  styleUrl: './confirm-delete-doctor-modal.component.scss'
})
export class ConfirmDeleteDoctorModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
  }

  cancel() {
    this.cancelled.emit();
  }
}
