import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../users/services/user.service';
import { ListUser } from '../../../../users/models/list-user';
import { AuthService } from '../../../../auth/services/auth.service';
import { PatientService } from '../../../../patients/services/patient.service';
import { ListPatient } from '../../../../patients/models/list-patient';
import { ListPatientResponse } from '../../../../patients/models/list-patient-response';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnumService } from '../../../../../services/enums/enum.service';
import { AlertifyService } from '../../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../../services/alertify/enums/Position';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../../../../auth/change-password/change-password/change-password.component';

@Component({
  selector: "app-patient-profile",
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ChangePasswordComponent],
  templateUrl: "./patient-profile.component.html",
  styleUrl: "./patient-profile.component.scss"
})
export class PatientProfileComponent implements OnInit {

  pageRequest: PageRequest = { page: 0, size: 10 };
  user: ListUser;
  patient: ListPatient;
  errorMessage: any;
  userId:any
  age: number | null = null;
  patientDetailFormGroup: FormGroup;
  bloodTypes: any[] = [];
  insuranceTypes: any[] = [];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private patientService:PatientService,
    private formBuilder: FormBuilder,
    private enumService:EnumService,
    private alertify: AlertifyService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.createForm();
 this.getUser();
 this.getPatients();
 this.getBloodTypes();
 this.getInsuranceTypes();
  }
  private createForm() {
    this.patientDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      userId: ["",[Validators.required]],
      bloodType: ["",[Validators.required]],
      insuranceType: ["",[Validators.required]],
      socialSecurityNumber: ["",[Validators.required]],
      healthHistory: ["",[Validators.required]],
      allergies: ["",[Validators.required]],
      currentMedications: ["",[Validators.required]],
      emergencyContactName: ["",[Validators.required]],
      emergencyContactPhoneNumber: ["",[Validators.required]],
      emergencyContactRelationship: ["",[Validators.required]],
    });
  }
  getUser(){
    const userId= Number(this.authService.getCurrentUserId());
    this.userService.getUser(userId).subscribe({
      next: userData => {
        this.user = userData;
        this.age = this.calculateAge(new Date(this.user.birthDate));

        console.log("user", this.user);
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }
  getPatients(){
    const userId= Number(this.authService.getCurrentUserId());
    this.patientService.read(this.pageRequest).subscribe({
      next: (response: ListPatientResponse) => {
        console.log("patients:", response.items);
        this.patient = response.items.find(patient => patient.userId === userId) || null;
        console.log("patients2:",this.patient );  // Veriyi kontrol et
        this.patientDetailFormGroup.patchValue(this.patient);
      },
      error: (error: any) => {
        console.error("Error loading patients:", error);
      }
    });
  }
  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  getBloodTypes() {
    this.enumService.getEnumValues("get-blood-types").subscribe({
      next: data => {
        console.log("bloodTypes:", data);  // Veriyi kontrol et
        this.bloodTypes = data;
        // this.bloodTypesLoaded = true;
        // this.checkDataLoaded();
      },
      error: error => {
        console.error("Error fetching blood types:", error);
      }
    });
  }

  getInsuranceTypes() {
    this.enumService.getEnumValues("get-insurance-type").subscribe({
      next: data => {
        console.log("insuranceTypes:", data);  // Veriyi kontrol et
        this.insuranceTypes = data;
        // this.insuranceTypesLoaded = true;
        // this.checkDataLoaded();
      },
      error: error => {
        console.error("Error fetching insurance types:", error);
      }
    });
  }


  updatePatient() {
    const bloodTypeId=this.patientDetailFormGroup.get('bloodType')?.value
    const insuranceTypeId=this.patientDetailFormGroup.get('insuranceType')?.value
    const formData = this.patientDetailFormGroup.value;
    formData.bloodType = Number(bloodTypeId);
    formData.insuranceType = Number(insuranceTypeId)
    this.patientService.updatePatient(formData).subscribe(
      response => {
        console.log('patient updated:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/patient/profile']);
      },
      error => {
        console.error('patient could not be updated:', error);
        this.alertify.message("Authorization Exception", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  onSubmit() {
    console.log('patient updated:', this.patientDetailFormGroup.value);

    if (this.patientDetailFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.updatePatient();
  }
  }


