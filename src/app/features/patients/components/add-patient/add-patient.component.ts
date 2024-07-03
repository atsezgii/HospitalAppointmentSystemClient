import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageRequest } from '../../../../services/common/http-client.service';
import { PatientService } from '../../services/patient.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { Position } from '../../../../services/alertify/enums/Position';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { EnumService } from '../../../../services/enums/enum.service';
import { AddUserComponent } from '../../../users/components/add-user/add-user.component';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AddUserComponent],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent implements OnInit {

  newPatientFormGroup: FormGroup;
  bloodTypes: any[] = [];
  insuranceTypes: any[] = [];
  userFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private alertify: AlertifyService,
    private enumService:EnumService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getBloodTypes();
    this.getInsuranceTypes();
  }
  private createForm() {
    this.newPatientFormGroup = this.formBuilder.group({
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
    this.userFormGroup = this.formBuilder.group({
      // Define form controls for Add User component
      // Example:
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      gender: [''],
      city: [''],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      userType: ['doctor'], // Example default value
      photoUrl: ['', Validators.required],
      birthDate: ['']
      // Add other fields as needed
    });

  }
  addPatient(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const bloodTypeId=this.newPatientFormGroup.get('bloodType')?.value
    const insuranceTypeId=this.newPatientFormGroup.get('insuranceType')?.value
    const userId=this.newPatientFormGroup.get('userId')?.value
    const formData = this.newPatientFormGroup.value;
    formData.bloodType = Number(bloodTypeId);
    formData.insuranceType = Number(insuranceTypeId)
    formData.userId = Number(userId)
    console.log("forö", formData)
    if ( this.newPatientFormGroup.valid) {

      this.patientService.create(
        formData,
      );
      console.log("va", this.newPatientFormGroup.value)
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
     // this.newPatientFormGroup.reset();
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
  onFormSubmit() {
    console.log("forö", this.newPatientFormGroup.value)

    if (this.newPatientFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.addPatient();
  }
}
