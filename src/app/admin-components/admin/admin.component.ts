import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { UserService } from '../../features/users/services/user.service';
import { ApiResponse } from '../../features/doctors/models/list-doctor-response';
import { PageRequest } from '../../services/common/http-client.service';
import { DoctorService } from '../../features/doctors/services/doctor.service';
import { PatientService } from '../../features/patients/services/patient.service';
import { ListPatientResponse } from '../../features/patients/models/list-patient-response';
import { UserListApiResponse } from '../../features/users/models/list-user-response';
import { AppointmentService } from '../../features/patient-features/patient-appointment/services/appointment.service';
import { AppointmentResponse } from '../../features/patient-features/patient-appointment/models/list-appointment-response';

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss"
})
export class AdminComponent implements OnInit {
  pageRequest: PageRequest = { page: 0, size: 100 };
  doctorCount: number = 0;
  patientCount: number = 0;
  userCount: number = 0;
  appointmentCount: number = 0;
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private userService: UserService,
    private appointmentService: AppointmentService
  ) {}
  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
    this.loadUsers();
    this.loadAppointments();
  }
  loadDoctors() {
    this.doctorService.read(this.pageRequest).subscribe({
      next: (response: ApiResponse) => {
        this.doctorCount = response.count;
        console.log("doctorCount:", this.doctorCount);
      },
      error: (error: any) => {
        console.error("Error loading doctors:", error);
      }
    });
  }
  loadPatients() {
    this.patientService.read(this.pageRequest).subscribe({
      next: (response: ListPatientResponse) => {
        this.patientCount = response.count;
        console.log("patientCount:", this.patientCount);
      },
      error: (error: any) => {
        console.error("Error loading patientCount:", error);
      }
    });
  }
  loadUsers() {
    this.userService.read(this.pageRequest).subscribe({
      next: (response: UserListApiResponse) => {
        this.userCount = response.count;
        console.log("userCount:", this.userCount);
      },
      error: (error: any) => {
        console.error("Error loading userCount:", error);
      }
    });
  }
  loadAppointments() {
    this.appointmentService.read(this.pageRequest).subscribe({
      next: (response: AppointmentResponse) => {
        this.appointmentCount = response.count;
        console.log("appointmentCount:", this.appointmentCount);
      },
      error: (error: any) => {
        console.error("Error loading appointmentCount:", error);
      }
    });
  }
}
