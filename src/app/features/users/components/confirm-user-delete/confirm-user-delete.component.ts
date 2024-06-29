import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-user-delete',
  standalone: true,
  imports: [],
  templateUrl: './confirm-user-delete.component.html',
  styleUrl: './confirm-user-delete.component.scss'
})
export class ConfirmUserDeleteComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
  }

  cancel() {
    this.cancelled.emit();
  }
}
