import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { ListDoctor } from '../../models/list-doctor';
import { PageRequest } from '../../../../services/common/http-client.service';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from '../../../../admin-components/doctors/doctors.component';
import { ApiResponse } from '../../models/list-doctor-response';
import { Subscription } from 'rxjs';
import { ListUser } from '../../../users/models/list-user';
import { UserService } from '../../../users/services/user.service';
import { UserListApiResponse } from '../../../users/models/list-user-response';
import { DepartmentService } from '../../../departments/services/department.service';
import { ListDepartment } from '../../../departments/models/list-department';

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss"
})
export class ListComponent implements OnInit {
  doctors: ListDoctor[] = [];
  users: ListUser[] = [];
  departments: ListDepartment[] = [];
  combinedData: any[] = [];
  pageRequest: PageRequest = { page: 0, size: 10 };
  count: number = 0;
  subscription: Subscription;
  doctorsLoaded: boolean = false;
  usersLoaded: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadUsers();
    this.loadDepartments();
  }
  async loadDoctors() {
    this.subscription = this.doctorService.read(this.pageRequest).subscribe({
      next: (response: ApiResponse) => {
        this.doctors = response.items;
        this.count = response.count;
        console.log("count", this.count);
        this.doctorsLoaded = true;
        this.checkDataLoaded();
        console.log("doctors", this.doctors);
      },
      error: (error: any) => {
        console.error("Error loading doctors:", error);
      }
    });
  }
  async loadUsers() {
    this.subscription = this.userService.read(this.pageRequest).subscribe({
      next: (response: UserListApiResponse) => {
        this.users = response.items;
        this.usersLoaded = true;
        this.checkDataLoaded();
      },
      error: (error: any) => {
        console.error("Error loading users:", error);
      }
    });
  }
  loadDepartments(): void {
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
  checkDataLoaded(): void {
    if (this.doctorsLoaded && this.usersLoaded) {
      this.combineData();
    }
  }

  combineData(): void {
    this.combinedData = this.doctors.map(doctor => {
      const user = this.users.find(u => u.id === doctor.userId);
      const department = this.departments.find(
        d => d.id === doctor.departmentId
      );
      // console.log('Doctor:', doctor);  // Her bir doktoru kontrol edin
      // console.log('Matched User:', user);  // Eşleşen kullanıcıyı kontrol edin
      return {
        ...doctor,
        userName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        departmentName: department ? department.name : "Unknown"
      };
    });
    console.log("Combined Data:", this.combinedData);
  }
  // Abonelik iptal edildiğinde (component kapatıldığında vs.) subscription'ı unsubscribe etmek için:
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
}
