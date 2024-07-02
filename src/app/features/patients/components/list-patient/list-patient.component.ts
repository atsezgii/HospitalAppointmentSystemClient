import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnumService } from '../../../../services/enums/enum.service';
import { ListPatientResponse } from '../../models/list-patient-response';
import { ListPatient } from '../../models/list-patient';
import { PatientService } from '../../services/patient.service';
import { PageRequest } from '../../../../services/common/http-client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-list-patient",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list-patient.component.html",
  styleUrls: ["./list-patient.component.scss"]
})
export class ListPatientComponent implements OnInit, OnDestroy {
  bloodTypes: any[] = [];
  insuranceTypes: any[] = [];
  patients: ListPatient[] = [];
  count: number = 0;
  pageRequest: PageRequest = { page: 0, size: 10 };
  subscriptions: Subscription[] = [];
  combinedData: any[] = [];
  bloodTypesLoaded: boolean = false;
  insuranceTypesLoaded: boolean = false;
  patientsLoaded: boolean = false;

  constructor(
    private enumService: EnumService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.getBloodTypes();
    this.getInsuranceTypes();
  }

  combineData(): void {
    this.combinedData = this.patients.map(patient => {
      const bloodType = this.bloodTypes.find(u => u.value === patient.bloodType);
      const insuranceType = this.insuranceTypes.find(d => d.value === patient.insuranceType);
      console.log("patient:", patient);
      console.log("bloodType:", bloodType);
      console.log("insuranceType:", insuranceType);
      return {
        ...patient,
        bloodTypeName: bloodType ? bloodType.name : 'Unknown',
        insuranceTypeName: insuranceType ? insuranceType.name : 'Unknown'
      };
    });
    console.log('Combined Data:', this.combinedData);
  }

  loadPatients() {
    const patientsSubscription = this.patientService
      .read(this.pageRequest)
      .subscribe({
        next: (response: ListPatientResponse) => {
          console.log("patients:", response.items);  // Veriyi kontrol et
          this.patients = response.items;
          this.count = response.count;
          this.patientsLoaded = true;
          this.checkDataLoaded();
        },
        error: (error: any) => {
          console.error("Error loading patients:", error);
        }
      });
    this.subscriptions.push(patientsSubscription);
  }

  getBloodTypes() {
    this.enumService.getEnumValues("get-blood-types").subscribe({
      next: data => {
        console.log("bloodTypes:", data);  // Veriyi kontrol et
        this.bloodTypes = data;
        this.bloodTypesLoaded = true;
        this.checkDataLoaded();
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
        this.insuranceTypesLoaded = true;
        this.checkDataLoaded();
      },
      error: error => {
        console.error("Error fetching insurance types:", error);
      }
    });
  }

  checkDataLoaded(): void {
    if (this.patientsLoaded && this.insuranceTypesLoaded && this.bloodTypesLoaded) {
      console.log("All data loaded, combining data...");
      this.combineData();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
