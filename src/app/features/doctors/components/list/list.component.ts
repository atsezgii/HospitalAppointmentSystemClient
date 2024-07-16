import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { ListDoctor } from '../../models/list-doctor';
import { PageRequest } from '../../../../services/common/http-client.service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../models/list-doctor-response';
import { Subscription } from 'rxjs';
import { ListUser } from '../../../users/models/list-user';
import { UserService } from '../../../users/services/user.service';
import { UserListApiResponse } from '../../../users/models/list-user-response';
import { DepartmentService } from '../../../departments/services/department.service';
import { ListDepartment } from '../../../departments/models/list-department';
import { Router } from '@angular/router';
import { DoctorDataShareService } from '../../services/doctor-data-share.service';
import { ConfirmDeleteDoctorModalComponent } from '../confirm-delete-doctor-modal/confirm-delete-doctor-modal.component';
import { ListDoctorsComponent } from '../../../patient-features/list-doctors/components/list-doctors/list-doctors.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,ConfirmDeleteDoctorModalComponent,ListDoctorsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  doctors: ListDoctor[] = [];
  users: ListUser[] = [];
  departments: ListDepartment[] = [];
  combinedData: any[] = [];
  pageRequest: PageRequest = { page: 0, size: 10 };
  count: number = 0;
  subscriptions: Subscription[] = [];
  doctorsLoaded: boolean = false;
  usersLoaded: boolean = false;
  departmentsLoaded: boolean = false;
  showModal: boolean = false;
  doctorsToDelete: ListDoctor | null = null;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private departmentService: DepartmentService,
    private router:Router,
    private doctorShareDataService:DoctorDataShareService
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadUsers();
    this.loadDepartments();
  }

  loadDoctors() {
    const doctorsSubscription = this.doctorService.read(this.pageRequest).subscribe({
      next: (response: ApiResponse) => {
        this.doctors = response.items;
        this.count = response.count;
        this.doctorsLoaded = true;
        this.checkDataLoaded();
      },
      error: (error: any) => {
        console.error('Error loading doctors:', error);
      }
    });
    this.subscriptions.push(doctorsSubscription);
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

  loadDepartments() {
    const departmentsSubscription = this.departmentService.read(this.pageRequest).subscribe({
      next: response => {
        this.departments = response.items;
        this.departmentsLoaded = true;
        this.checkDataLoaded();
      },
      error: err => {
        console.error('Department load failed', err);
      }
    });
    this.subscriptions.push(departmentsSubscription);
  }

  checkDataLoaded(): void {
    if (this.doctorsLoaded && this.usersLoaded && this.departmentsLoaded) {
      this.combineData();
    }
  }

  combineData(): void {
    this.combinedData = this.doctors.map(doctor => {
      const user = this.users.find(u => u.id === doctor.userId);
      const department = this.departments.find(d => d.id === doctor.departmentId);
      return {
        ...doctor,
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        photoUrl : user ? `${user.photoUrl}` : '../assets/images/doctors/01.jpg',
        departmentName: department ? department.name : 'Unknown'
      };
    });
    this.doctorShareDataService.changeCombinedDoctorData(this.combinedData);
    console.log('Combined Data:', this.combinedData)
  }
  showDoctorDetails(doctor: any) {
    this.doctorShareDataService.changeDoctor(doctor);
    console.log("doctor detail id", doctor.id);
    this.router.navigate(['/admin/doctor', doctor.id]);
  }
  showDeleteModal(doctor: ListDoctor) {
    this.doctorsToDelete = doctor;
    this.showModal = true;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadDoctors();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  confirmDelete() {
    if (this.doctorsToDelete) {
      this.doctorService.deleteDoctor(this.doctorsToDelete.id).subscribe({
        next: () => {
          this.doctors = this.doctors.filter(d => d.id !== this.doctorsToDelete!.id);
          this.showModal = false;
          this.doctorsToDelete = null;
        },
        error: err => {
          console.error('Error deleting doctor:', err);
          this.showModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
    this.doctorsToDelete = null;
  }

}
