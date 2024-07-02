import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { EnumService } from '../../../../services/enums/enum.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatIconModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  userFormGroup: FormGroup;
  genders: any[];
  cities: any[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertify: AlertifyService,
    private enumService:EnumService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getCities();
    this.getGenders();
  }
  private createForm() {
    this.userFormGroup = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", Validators.required],
      birthDate: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      userType: ["", Validators.required],
      photoUrl: ["", Validators.required],
    });
  }
  addUser(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    if (this.userFormGroup.valid) {

      this.userService.create(
        this.userFormGroup.value,
        successCallBack,
        errorCallBack
      );
      console.log("va", this.userFormGroup.value)
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.userFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    if (errorCallBack) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }
  onFormSubmit() {
    if (this.userFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.addUser();
  }
  getGenders(){
    this.enumService.getEnumValues('get-genders')
    .subscribe({
      next: (data) => {
        console.log('Genders:', data); // Gelen veriyi konsolda kontrol edin
        this.genders = data;
      },
      error: (error) => {
        console.error('Error fetching genders:', error);
      }
    });
  }
  getCities(){
    this.enumService.getEnumValues('get-cities')
    .subscribe({
      next: (data) => {
        console.log('Cities:', data); // Gelen veriyi konsolda kontrol edin
        this.cities = data;
      },
      error: (error) => {
        console.error('Error fetching genders:', error);
      }
    });
  }
}
