import { Component, OnInit } from '@angular/core';
import { UserDataShareService } from '../../services/user-data-share.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnumService } from '../../../../services/enums/enum.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: "app-user-detail",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatIconModule],
  templateUrl: "./user-detail.component.html",
  styleUrl: "./user-detail.component.scss"
})
export class UserDetailComponent implements OnInit {

  user: any;
  userForm: FormGroup;
  genders: any[];
  cities: any[];
  constructor(
    private route: ActivatedRoute,
    private userDataShareService: UserDataShareService,
    private formBuilder: FormBuilder,
    private enumService:EnumService,
    private userService:UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getDetailOfUser();
    this.getGenders();
    this.getCities();
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

  initForm(): void {
    this.userForm = this.formBuilder.group({
      id: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
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
  private getDetailOfUser() {
    this.route.paramMap.subscribe(params => {
      const userId = +params.get("id");
      this.userDataShareService.currentUser.subscribe(user => {
        if (user && user.id === userId) {
          this.user = user;
          this.userForm.patchValue(user);
        }
      });
    });
  }



  onSubmit() {

    if (this.userForm.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.updateUser();
  }
  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe(
      response => {
        console.log('Kullanıcı güncellendi:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/admin/users']);
      },
      error => {
        console.error('Kullanıcı güncellenemedi:', error);
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  }

