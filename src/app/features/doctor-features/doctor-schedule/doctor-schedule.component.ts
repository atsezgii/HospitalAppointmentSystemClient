import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SidebarComponent } from '../../../layout/doctor-layout/components/sidebar/sidebar.component';
import { CalendarOptions } from '@fullcalendar/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { PageRequest } from '../../../services/common/http-client.service';
import { DoctorScheduleService } from './services/doctor-schedule.service';
import { Position } from '../../../services/alertify/enums/Position';
import { MessageType } from '../../../services/alertify/enums/MessageType';
import { AlertifyService } from '../../../services/alertify/alertify.service';
import { AuthService } from '../../auth/services/auth.service';
import { DoctorService } from '../../doctors/services/doctor.service';

@Component({
  selector: "app-doctor-schedule",
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: "./doctor-schedule.component.html",
  styleUrls: ["./doctor-schedule.component.scss"]
})
export class DoctorScheduleComponent implements OnInit {
  newDoctorScheduleFormGroup: FormGroup;
  pageRequest: PageRequest = { page: 0, size: 20 };
  count: number = 0;
  userName:string;
  startTime: string;
  endTime: string;
  doctorId: number;
  userId: number;
  intervalInMinutes: number = 15;
  minDateTime: string;
  maxDateTime: string;
  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private doctorScheduleService: DoctorScheduleService,
    private alertify:AlertifyService,
    private doctorService:DoctorService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getCurrentUserName();
    const now = new Date();
    const today = now.toISOString().slice(0, 10); // 'YYYY-MM-DD' formatında bugünün tarihi
    this.minDateTime = `${today}T00:00`; // Bugünün başlangıç saati
    this.maxDateTime = `${today}T23:59`; // Bugünün bitiş saati
    this.createForm();
  }

  private createForm() {
    this.newDoctorScheduleFormGroup = this.formBuilder.group({
      doctorId: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      intervalInMinutes: ["", [Validators.required]]
    });
  }
  addDoctorSchedule(payload:any) {
    if (payload) {
      this.doctorScheduleService.create(
        payload,
      );
      console.log("va", this.newDoctorScheduleFormGroup.value);
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.newDoctorScheduleFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }
  async onSubmit() {
    this.userId = Number(this.authService.getCurrentUserId());
    console.log("UserId:", this.userId);

    try {
      const doctorsResponse = await this.doctorService.read(this.pageRequest).toPromise();
      const doctor = doctorsResponse.items.find(d => d.userId === this.userId);
      this.doctorId = doctor ? doctor.id : null;
      console.log("DoctorId:", this.doctorId);

      if (this.doctorId !== null) {
        const payload = {
          doctorId: this.doctorId,
          startTime: new Date(this.startTime).toISOString(),
          endTime: new Date(this.endTime).toISOString(),
          intervalInMinutes: this.intervalInMinutes
        };
        this.addDoctorSchedule(payload);
        console.log("Payload:", payload);
      } else {
        console.error("Doctor not found for the current user.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }




}
