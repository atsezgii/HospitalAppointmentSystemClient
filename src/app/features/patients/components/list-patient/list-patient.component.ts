import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnumService } from '../../../../services/enums/enum.service';
import { ListPatientResponse } from '../../models/list-patient-response';
import { ListPatient } from '../../models/list-patient';
import { PatientService } from '../../services/patient.service';
import { PageRequest } from '../../../../services/common/http-client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListUser } from '../../../users/models/list-user';
import { UserService } from '../../../users/services/user.service';
import { UserListApiResponse } from '../../../users/models/list-user-response';
import { ConfirmPatientDeleteModalComponent } from '../confirm-patient-delete-modal/confirm-patient-delete-modal.component';
import { PatientDataShareService } from '../../services/patient-data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-list-patient",
  standalone: true,
  imports: [CommonModule,ConfirmPatientDeleteModalComponent],
  templateUrl: "./list-patient.component.html",
  styleUrls: ["./list-patient.component.scss"]
})
export class ListPatientComponent implements OnInit, OnDestroy {

  bloodTypes: any[] = [];
  insuranceTypes: any[] = [];
  patients: ListPatient[] = [];
  users: ListUser[] = [];
  usersLoaded: boolean = false;
  count: number = 0;
  pageRequest: PageRequest = { page: 0, size: 10 };
  subscriptions: Subscription[] = [];
  combinedData: any[] = [];
  bloodTypesLoaded: boolean = false;
  insuranceTypesLoaded: boolean = false;
  patientsLoaded: boolean = false;
  expandedRow: number | null = null; // New property to track the expanded row
  showModal: boolean = false;
  patientsToDelete: ListPatient | null = null;
  constructor(
    private enumService: EnumService,
    private patientService: PatientService,
    private userService: UserService,
    private patientShareDataService : PatientDataShareService,
    private router:Router
  ) {}
  toggleExpand(patientId: number): void {
    this.expandedRow = this.expandedRow === patientId ? null : patientId;
  }
  ngOnInit(): void {
    this.loadPatients();
    this.loadUsers();
    this.getBloodTypes();
    this.getInsuranceTypes();
  }

  combineData(): void {
    this.combinedData = this.patients.map(patient => {
      const bloodType = this.bloodTypes.find(u => u.value === patient.bloodType);
      const insuranceType = this.insuranceTypes.find(d => d.value === patient.insuranceType);
      const user = this.users.find(u => u.id === patient.userId);
      console.log("patient:", patient);
      console.log("bloodType:", bloodType);
      console.log("insuranceType:", insuranceType);
      return {
        ...patient,
        bloodTypeName: bloodType ? bloodType.name : 'Unknown',
        insuranceTypeName: insuranceType ? insuranceType.name : 'Unknown',
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown'
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
  loadUsers() {
    const usersSubscription = this.userService.read(this.pageRequest).subscribe({
      next: (response: UserListApiResponse) => {
        this.users = response.items;
        this.usersLoaded = true;
        this.checkDataLoaded();
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
      }
    });
    this.subscriptions.push(usersSubscription);
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
    if (this.patientsLoaded && this.insuranceTypesLoaded && this.bloodTypesLoaded && this.usersLoaded ) {
      console.log("All data loaded, combining data...");
      this.combineData();
    }
  }
  showPatientDetails(patient: any) {
    console.log("patient detail id", patient.id);

    this.patientShareDataService.changePatient(patient);
    console.log("patient detail id", patient.id);
    this.router.navigate(['/admin/patient', patient.id]);
  }
  showDeleteModal(patient: ListPatient) {
    this.patientsToDelete = patient;
    this.showModal = true;
  }
  confirmDelete() {
    if (this.patientsToDelete) {
      this.patientService.deletePatient(this.patientsToDelete.id).subscribe({
        next: () => {
          this.patients = this.patients.filter(d => d.id !== this.patientsToDelete!.id);
          this.showModal = false;
          this.patientsToDelete = null;
        },
        error: err => {
          console.error('Error deleting patient:', err);
          this.showModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
    this.patientsToDelete = null;
  }
  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadPatients();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
