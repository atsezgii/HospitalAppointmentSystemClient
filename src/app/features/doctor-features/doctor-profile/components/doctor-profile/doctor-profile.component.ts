import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../../layout/doctor-layout/components/sidebar/sidebar.component';
import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../../../users/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnumService } from '../../../../../services/enums/enum.service';
import { AlertifyService } from '../../../../../services/alertify/alertify.service';
import { Router } from '@angular/router';
import { ListDoctor } from '../../../../doctors/models/list-doctor';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { ListUser } from '../../../../users/models/list-user';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { ApiResponse } from '../../../../doctors/models/list-doctor-response';
import { ListDepartment } from '../../../../departments/models/list-department';
import { DepartmentService } from '../../../../departments/services/department.service';
import { MessageType } from '../../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../../services/alertify/enums/Position';
import { ChangePasswordComponent } from '../../../../auth/change-password/change-password/change-password.component';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, CommonModule,ChangePasswordComponent],
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  userName: string;
  pageRequest: PageRequest = { page: 0, size: 10 };
  user: ListUser;
  doctor: ListDoctor;
  errorMessage: any;
  userId: any;
  doctorDetailFormGroup: FormGroup;
  userDetailFormGroup: FormGroup;
  cities: any[];
  departments: ListDepartment[] = [];
  combinedFormGroup: FormGroup;
  genders: any[];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private enumService: EnumService,
    private alertify: AlertifyService,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getCurrentUserName();
    this.createForms();
    this.getUser();
    this.getDoctors();
    this.getCities();
    this.loadDepartments();
    this.getGenders();
  }

  private createForms() {
    this.userDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", Validators.required],
      photoUrl: ["", Validators.required],
      gender: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
    });

    this.doctorDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      userId: ["", Validators.required],
      departmentId: ["", Validators.required],
      specialistLevel: ["", Validators.required],
      yearsOfExperience: ["", Validators.required],
      biography: ["", Validators.required],
    });

    this.combinedFormGroup = this.formBuilder.group({
      userDetails: this.userDetailFormGroup,
      doctorDetails: this.doctorDetailFormGroup
    });
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
  getUser() {
    const userId = Number(this.authService.getCurrentUserId());
    this.userService.getUser(userId).subscribe({
      next: userData => {
        this.user = userData;
        console.log("user", this.user);
        this.userDetailFormGroup.patchValue(this.user);
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }

  getCities() {
    this.enumService.getEnumValues('get-cities').subscribe({
      next: data => {
        console.log('Cities:', data);
        this.cities = data;
      },
      error: error => {
        console.error('Error fetching cities:', error);
      }
    });
  }

  getDoctors() {
    const userId = Number(this.authService.getCurrentUserId());
    this.doctorService.read(this.pageRequest).subscribe({
      next: (response: ApiResponse) => {
        console.log("doctors:", response.items);
        this.doctor = response.items.find(doctor => doctor.userId === userId) || null;
        console.log("doctor:", this.doctor);
        this.doctorDetailFormGroup.patchValue(this.doctor);
      },
      error: error => {
        console.error("Error loading doctors:", error);
      }
    });
  }

  loadDepartments() {
    this.departmentService.read(this.pageRequest).subscribe({
      next: response => {
        this.departments = response.items;
        console.log("deps", this.departments);
      },
      error: err => {
        console.error("Department load failed", err);
      }
    });
  }
  updatedoctor() {

    this.doctorService.updateDoctor(this.doctorDetailFormGroup.value).subscribe(
      response => {
        console.log('doctor updated:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/doctor/profile']);
      },
      error => {
        console.error('doctor could not be updated:', error);
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  updateUser() {
    this.userService.updateUser(this.userDetailFormGroup.value).subscribe(
      response => {
        console.log('Kullanıcı güncellendi:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
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
  onSubmit() {
    if (this.combinedFormGroup.valid) {
      const formData = this.combinedFormGroup.value;
      console.log('Form Data:', formData);
      // Form verilerini işleme kodu burada olacak
      this.updateUser();
      this.updatedoctor();
    } else {
      console.log('Formlar geçersiz');
    }
  }
}
