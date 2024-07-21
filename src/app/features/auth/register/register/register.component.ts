import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: "app-register",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss"
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private alertify:AlertifyService) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.registerFormGroup = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      userType: ["", [Validators.required]]
    });
  }

  userRegister(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    if (this.registerFormGroup.valid) {
      this.authService.register(
        this.registerFormGroup.value,
        successCallBack,
        errorCallBack
      );
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.registerFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    if (errorCallBack) {
      errorCallBack("Form is not valid");
    }
  }

  onFormSubmit() {
    if (this.registerFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.userRegister();
  }
}
