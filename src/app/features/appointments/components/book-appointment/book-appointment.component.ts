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
  dates = [
    '17.07.2024 - Çarşamba',
    '18.07.2024 - Perşembe',
    '19.07.2024 - Cuma',
    '22.07.2024 - Pazartesi',
    '23.07.2024 - Salı'
  ];
  selectedDate = this.dates[0];
  selectedTime: string | null = null;

  timeSlots = [
    {
      hour: '09:00',
      times: [
        { time: '09:00', disabled: false },
        { time: '09:10', disabled: false },
        { time: '09:20', disabled: false },
        { time: '09:30', disabled: false },
        { time: '09:40', disabled: true },
        { time: '09:50', disabled: false }
      ]
    },
    {
      hour: '10:00',
      times: [
        { time: '10:00', disabled: false },
        { time: '10:10', disabled: true },
        { time: '10:20', disabled: false },
        { time: '10:30', disabled: false },
        { time: '10:40', disabled: false },
        { time: '10:50', disabled: false }
      ]
    },
    // Diğer saat gruplarını burada ekleyin
  ];

  constructor() { }

  ngOnInit(): void { }

  selectDate(date: string): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }
}
