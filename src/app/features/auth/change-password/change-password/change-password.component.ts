import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertify:AlertifyService
  ) {
    this.changePasswordForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      NewPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      console.log("this.changePasswordForm.value",this.changePasswordForm.value)
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: () => {
          this.alertify.message("Password Changed Successfully", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}
