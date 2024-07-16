import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from '../../../../doctors/models/list-doctor-response';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { ListDoctor } from '../../../../doctors/models/list-doctor';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DoctorDataShareService } from '../../../../doctors/services/doctor-data-share.service';
import { ListDepartment } from '../../../../departments/models/list-department';
import { ListUser } from '../../../../users/models/list-user';
import { DepartmentService } from '../../../../departments/services/department.service';
import { UserService } from '../../../../users/services/user.service';
import { Router } from '@angular/router';
import { ListComponent } from '../../../../doctors/components/list/list.component';
import { UserListApiResponse } from '../../../../users/models/list-user-response';

@Component({
  selector: 'app-list-doctors',
  standalone: true,
  imports: [CommonModule,ListComponent],
  templateUrl: './list-doctors.component.html',
  styleUrl: './list-doctors.component.scss'
})
export class ListDoctorsComponent implements OnInit{
  doctors: ListDoctor[] = [];
  users: ListUser[] = [];
  departments: ListDepartment[] = [];
  @Input() combinedData: any[] = [];
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
}
