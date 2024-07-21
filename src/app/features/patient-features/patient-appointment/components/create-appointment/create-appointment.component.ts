import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { AppointmentService } from '../../services/appointment.service';
import { AlertifyService } from '../../../../../services/alertify/alertify.service';
import { DepartmentService } from '../../../../departments/services/department.service';
import { ListDepartment } from '../../../../departments/models/list-department';
import { Subscription } from 'rxjs';
import { ListDoctor } from '../../../../doctors/models/list-doctor';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { ApiResponse } from '../../../../doctors/models/list-doctor-response';
import { UserService } from '../../../../users/services/user.service';
import { ListUser } from '../../../../users/models/list-user';
import { UserListApiResponse } from '../../../../users/models/list-user-response';
import { ListAppointmentsComponent } from '../list-appointments/list-appointments.component';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ListAppointmentsComponent],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent implements OnInit{
  newAppointmentFormGroup: FormGroup;
  pageRequest: PageRequest = { page: 0, size: 1000 };
  count: number = 0;
  departments: ListDepartment[] = [];
  subscriptions: Subscription[] = [];
  doctors: ListDoctor[] = [];
  users: ListUser[] = [];
  appointments: any[] = [];
  combinedData: any[] = [];
  doctorsLoaded: boolean = false;
  usersLoaded: boolean = false;
  departmentForm: FormGroup;
  doctorForm: FormGroup;
  appointmentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private alertify: AlertifyService,
    private departmentService: DepartmentService,
    private doctorService:DoctorService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.loadDepartments();
    this.departmentForm = this.formBuilder.group({
      departmentId: [null]
    });
    this.doctorForm = this.formBuilder.group({
      doctorId: [null]
    });
    this.appointmentForm = this.formBuilder.group({
      appointmentId: [null]
    });

    this.departmentForm.get('departmentId')?.valueChanges.subscribe(departmentId => {
      this.loadDoctors(departmentId);
      this.loadUsers();
    });

    this.doctorForm.get('doctorId')?.valueChanges.subscribe(doctorId => {
      const currentDate = new Date().toISOString().split('T')[0]; // Today's date
      this.loadAppointments(doctorId, currentDate);
    });
  }
  loadAppointments(doctorId: any, currentDate: string) {
    throw new Error('Method not implemented.');
  }
  loadDoctors(departmentId: any) {
    console.log("depId",departmentId)
    const doctorsSubscription = this.doctorService.getByDepartment(departmentId,this.pageRequest).subscribe({
      next: response => {
        this.doctors = response.items;
        this.doctorsLoaded = true;
        this.checkDataLoaded();
        console.log("docsss", this.doctors);
      },
      error: err => {
        console.error('doctor load failed', err);
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
  checkDataLoaded(): void {
    if (this.doctorsLoaded && this.usersLoaded) {
      this.combineData();
    }
  }

  combineData(): void {
    this.combinedData = this.doctors.map(doctor => {
      const user = this.users.find(u => u.id === doctor.userId);
      return {
        ...doctor,
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
      };
    });

  }
  loadDepartments() {
    const departmentsSubscription = this.departmentService.read(this.pageRequest).subscribe({
      next: response => {
        this.departments = response.items//.filter((department: any) => !department.isDeleted);
        this.count =response.count;
        console.log("depsssss", this.departments);
      },
      error: err => {
        console.error('Department load failed', err);
      }
    });
    this.subscriptions.push(departmentsSubscription);
  }
}
