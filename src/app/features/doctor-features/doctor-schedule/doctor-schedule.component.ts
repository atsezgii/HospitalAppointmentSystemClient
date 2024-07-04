import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SidebarComponent } from '../../../layout/doctor-layout/components/sidebar/sidebar.component';
import { CalendarOptions } from '@fullcalendar/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-doctor-schedule",
  standalone: true,
  imports: [
    SidebarComponent,
    FormsModule,
    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: "./doctor-schedule.component.html",
  styleUrls: ["./doctor-schedule.component.scss"]
})
export class DoctorScheduleComponent {
  startTime: string;
  endTime: string;
  doctorId: number = 2;
  intervalInMinutes: number =15;

  constructor(private http: HttpClient) {}

  onSubmit() {

    const payload = {
      doctorId: this.doctorId,
      startTime: new Date(this.startTime).toISOString(),
      endTime: new Date(this.endTime).toISOString(),
      intervalInMinutes:this.intervalInMinutes
    };
    console.log('API response:', payload);

    this.http.post('https://localhost:44317/api/DoctorAvailability', payload).subscribe(response => {
      console.log('API response:', response);
    });
  }
}
