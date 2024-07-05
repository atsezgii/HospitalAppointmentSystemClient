import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListPatient } from '../../models/list-patient';
import { PageRequest } from '../../../../services/common/http-client.service';
import { PatientService } from '../../services/patient.service';
import { PatientDataShareService } from '../../services/patient-data-share.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';
import { EnumService } from '../../../../services/enums/enum.service';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.scss'
})
export class UpdatePatientComponent implements  OnInit{

  patientDetailFormGroup: FormGroup;
  patient: ListPatient;
  pageRequest: PageRequest = { page: 0, size: 20 };
  bloodTypes: any[] = [];
  insuranceTypes: any[] = [];
  constructor(private formBuilder: FormBuilder,
    private patientService:PatientService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private patientDataShareService: PatientDataShareService,
    private enumService:EnumService
  ){}

  ngOnInit(): void {
    this.createForm();
    this.getDetailOfPatient();
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
  private getDetailOfPatient() {
    this.route.paramMap.subscribe(params => {
      const patientId = +params.get("id");
      console.log("id",patientId)
      this.patientDataShareService.currentpatient.subscribe(patient => {
        if (patient && patient.id === patientId) {
          this.patient = patient;
          this.patientDetailFormGroup.patchValue(patient);
        }
      });
    });
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
        this.router.navigate(['/admin/patients']);
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
