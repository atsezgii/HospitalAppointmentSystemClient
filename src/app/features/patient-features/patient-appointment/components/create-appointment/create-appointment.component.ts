import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { AppointmentService } from '../../services/appointment.service';
import { AlertifyService } from '../../../../../services/alertify/alertify.service';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent implements OnInit{
  newAppointmentFormGroup: FormGroup;
  pageRequest: PageRequest = { page: 0, size: 20 };
  count: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private alertify: AlertifyService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.newAppointmentFormGroup = this.formBuilder.group({
      patientId: ["",[Validators.required]],
      appointmentSlotId: ["",[Validators.required]],
      status: ["",[Validators.required]],
      startTime: ["",[Validators.required]],
      endTime: ["",[Validators.required]],
    });
  }
}
