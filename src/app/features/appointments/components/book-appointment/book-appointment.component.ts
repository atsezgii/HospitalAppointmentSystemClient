import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  departments = [
    { id: 1, name: 'Kardiyoloji' },
    { id: 2, name: 'Ortopedi' },
    { id: 3, name: 'Dermatoloji' }
  ];
  doctors = [];
  timeSlots = [];
  availableTimes = [];

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onDepartmentChange(event: Event): void {
    const departmentId = (event.target as HTMLSelectElement).value;
    if (departmentId === '1') {
      this.doctors = [
        { id: 1, name: 'Dr. Ahmet Yılmaz' },
        { id: 2, name: 'Dr. Ayşe Demir' }
      ];
    } else if (departmentId === '2') {
      this.doctors = [
        { id: 3, name: 'Dr. Mehmet Öz' },
        { id: 4, name: 'Dr. Canan Karatay' }
      ];
    } else if (departmentId === '3') {
      this.doctors = [
        { id: 5, name: 'Dr. Serkan Aktaş' },
        { id: 6, name: 'Dr. Banu Kutlu' }
      ];
    }
  }

  onDoctorChange(event: Event): void {
    const doctorId = (event.target as HTMLSelectElement).value;
    if (doctorId === '1' || doctorId === '2') {
      this.timeSlots = ['2024-07-18', '2024-07-19', '2024-07-20'];
    } else if (doctorId === '3' || doctorId === '4') {
      this.timeSlots = ['2024-07-21', '2024-07-22', '2024-07-23'];
    } else if (doctorId === '5' || doctorId === '6') {
      this.timeSlots = ['2024-07-24', '2024-07-25', '2024-07-26'];
    }
    this.availableTimes = [];
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (this.timeSlots.includes(selectedDate)) {
      this.availableTimes = ['16:00', '16:30', '17:00'];
    } else {
      this.availableTimes = [];
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      // Burada form verilerini API'ye gönderebilirsiniz.
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }
}
