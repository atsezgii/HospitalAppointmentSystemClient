import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../../../services/alertify/alertify.service';
import { MessageType } from '../../../services/alertify/enums/MessageType';
import { Position } from '../../../services/alertify/enums/Position';
import { JwtHelperService } from '../../../services/common/jwt-helper.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private jwtService:JwtHelperService,  private authService:AuthService,private alertify:AlertifyService, private router: Router) {}

  userType : string;
  loginFormGroup: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });  }
userLogin() {
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
        this.userType = this.jwtService.getUserData(localStorage.getItem("token"));
        console.log("result",this.userType)

        this.loginFormGroup.reset();
        if(this.userType=="patient"){
           this.router.navigate(['/patient'])
        }
        else if(this.userType=="doctor"){
           this.router.navigate(['/doctor'])
        }
        else if(this.userType=="admin"){
          this.router.navigate(['/admin'])
        }
      },
      error: (errorResponse) => {
        this.alertify.message("Login failed", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    });
  } else {
    this.alertify.message("Form is not valid", {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    });


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
