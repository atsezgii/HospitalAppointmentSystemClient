import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../../doctors/models/list-doctor-response';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { PageRequest } from '../../../../../services/common/http-client.service';
import { ListDoctor } from '../../../../doctors/models/list-doctor';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DoctorDataShareService } from '../../../../doctors/services/doctor-data-share.service';

@Component({
  selector: 'app-list-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-doctors.component.html',
  styleUrl: './list-doctors.component.scss'
})
export class ListDoctorsComponent implements OnInit{
  combinedData: any[] = [];

  constructor(private doctorShareDataService: DoctorDataShareService) {}

  ngOnInit(): void {
    this.doctorShareDataService.currentCombinedDoctorData.subscribe(data => {
      this.combinedData = data;
      console.log('Received Combined Data in AnotherComponent:', this.combinedData);
    });
  }
}
