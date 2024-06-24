import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { ListDoctor } from '../../models/list-doctor';
import { PageRequest } from '../../../../services/common/http-client.service';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from '../../../../admin-components/doctors/doctors.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

 doctors: ListDoctor[] = [];
 pageRequest: PageRequest = { page: 0, size: 10 };
 count: number = 0;

constructor(private doctorService:DoctorService){}


 ngOnInit() {
  this.loadDoctors();
}

 loadDoctors(): void {
  this.doctorService.read(this.pageRequest).then(response => {
    this.doctors = response.items;
    this.count = response.count;
    console.log("doctors", this.doctors)
    console.log("count", this.count)
  }).catch(error => {
    console.error('Error loading doctors:', error);
  });
  }

  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadDoctors();
  }
  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
