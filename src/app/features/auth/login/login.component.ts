import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../../../services/alertify/alertify.service';
import { MessageType } from '../../../services/alertify/enums/MessageType';
import { Position } from '../../../services/alertify/enums/Position';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private alertify:AlertifyService, private router: Router) {}

  loginFormGroup: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });  }
userLogin(
  successCallBack?: () => void,
  errorCallBack?: (errorMessage: string) => void
) {
  if (this.loginFormGroup.valid) {
    this.authService.login(this.loginFormGroup.value).subscribe({
      next: (result) => {
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });

        localStorage.setItem("token", result.token);
        localStorage.setItem("date", result.expiration);

        this.loginFormGroup.reset();
        this.router.navigate(['/admin']);

        if (successCallBack) {
          successCallBack();
        }
      },
      error: (errorResponse) => {
        this.alertify.message("Login failed", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });

        if (errorCallBack) {
          errorCallBack(errorResponse.message);
        }
      }
    });
  } else {
    this.alertify.message("Form is not valid", {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    });

    if (errorCallBack) {
      errorCallBack("Form is not valid");
    }
  }
}


    onFormSubmit() {
      if (this.loginFormGroup.invalid) {
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        return;
      }
      this.userLogin();
    }
}
