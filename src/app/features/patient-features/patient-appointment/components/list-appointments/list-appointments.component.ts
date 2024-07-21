import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { ListDepartment } from '../../../../departments/models/list-department';
import { ListAppointment } from '../../models/list-appointment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { PatientService } from '../../../../patients/services/patient.service';

interface Appointment {
  id: number;
  date: Date;
  department: string;
  doctorName: string;
  hospital: string;
  speciality: string;
}
@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.scss'
})
export class ListAppointmentsComponent implements OnInit {
  pageRequest: PageRequest = { page: 0, size: 10 };
  appointments: ListAppointment[] = [];
  subscriptions: Subscription[] = [];
  count: number = 0;
  patientId: number | null = null;
  constructor(private appointmentService:AppointmentService,
              private authService:AuthService,
              private patientService:PatientService
  ) { }

  ngOnInit(): void {

  }


  loadAppointments(patientId:number) {
    const appointmentsSubscription = this.appointmentService.getByPatient(patientId,this.pageRequest).subscribe({
      next: response => {
        this.appointments = response.items;
        this.count =response.count;
        console.log("appsss", this.appointments);
      },
      error: err => {
        console.error('appointments load failed', err);
      }
    });
    this.subscriptions.push(appointmentsSubscription);
  }
  cancelAppointment(appointmentId: number) {
    console.log('Cancel appointment', appointmentId);
    // Implement cancel logic
  }

  editAppointment(appointmentId: number) {
    console.log('Edit appointment', appointmentId);
    // Implement edit logic
  }

  viewAppointmentDetails(appointmentId: number) {
    console.log('View appointment details', appointmentId);
    // Implement view logic
  }

  deleteAppointment(appointmentId: number) {
    console.log('Delete appointment', appointmentId);
    // Implement delete logic
  }

  rebookAppointment(appointmentId: number) {
    console.log('Rebook appointment', appointmentId);
    // Implement rebook logic
  }
}
